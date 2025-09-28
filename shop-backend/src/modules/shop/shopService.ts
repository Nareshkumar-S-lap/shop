import { ERROR } from '@common/constants/errorConstant';
import { SUCCESS } from '@common/constants/successConstant';
import { errorMessage, successMessage } from '@common/responseHelper';
import LocalUtils from '@common/utils/localUtils';
import { getShopByIdWithBranch, getShopList } from '@domain/dao/shopDao';
import { INVENTORY_STATUS_TEXT } from '@common/enum/enums';
import { getShopInventoryByShopId } from '@domain/dao/inventoryDao';

//Check if inventory needs reorder
const needsReorder = (quantity: number, reorderLevel: number) => {
  return quantity <= reorderLevel;
};

// Build generic filter for name and address
const buildShopFilter = (name?: string, address?: string) => {
  const filter: any = {};

  if (name) filter.name = { $regex: name, $options: 'i' };

  if (address) {
    filter.$or = ['city', 'state', 'postal_code', 'country'].map((field) => ({
      [`address.${field}`]: { $regex: address, $options: 'i' },
    }));
  }

  return filter;
};

export const shopList = async (name?: string, address?: string) => {
  const filter = buildShopFilter(name, address);

  const matchedShops: any = await getShopList(filter);

  if (!matchedShops?.length) {
    return errorMessage(
      ERROR.ERROR_MESSAGE.SHOP_LIST_NOT_FOUND,
      ERROR.ERROR_CODE.SHOP_LIST_NOT_FOUND,
      [],
    );
  }

  const mainBranchesMap = new Map<string, any>();

  matchedShops.forEach((shop: any) => {
    const mainBranch = shop.is_main_branch ? shop : shop.parent_shop;
    if (!mainBranch) return;

    if (!mainBranchesMap.has(mainBranch.id)) {
      mainBranchesMap.set(mainBranch.id, {
        ...mainBranch,
        metadata: {
          ...mainBranch.metadata,
          holiday_list: Array.isArray(mainBranch.metadata?.holiday_list)
            ? LocalUtils.mapHolidayList(mainBranch.metadata.holiday_list)
            : [],
        },
        branch_count: 0,
      });
    }

    if (!shop.is_main_branch) {
      mainBranchesMap.get(mainBranch.id)!.branch_count += 1;
    }
  });

  const formattedResult = Array.from(mainBranchesMap.values());

  return successMessage(
    SUCCESS.SUCCESS_MESSAGE.SHOP_LIST_FETCHED,
    SUCCESS.SUCCESS_CODE.SHOP_LIST_FETCHED,
    formattedResult,
  );
};

//Returns standardized shop-not-found response
const shopNotFound = () =>
  errorMessage(
    ERROR.ERROR_MESSAGE.SHOP_NOT_FOUND,
    ERROR.ERROR_CODE.SHOP_NOT_FOUND,
    [],
  );

// Format inventory item details
const formatInventoryItem = (inv: any) => {
  const item = inv.item_detail;
  return {
    item_code: item.item_code,
    item_name: item.name,
    description: item.description || '',
    category: item.category,
    brand: item.brand || '',
    unit: item.unit,
    tags: item.tags || [],
    price: inv.price,
    quantity: inv.quantity,
    reorder_level: inv.reorder_level,
    status: INVENTORY_STATUS_TEXT[inv.status] || '-',
    needsReorder: needsReorder(inv.quantity, inv.reorder_level),
  };
};

// Build shop map from inventories
const buildShopMap = (inventories: any[], mainShop: any) => {
  const shopMap: Record<string, any> = {};

  inventories.forEach((inv: any) => {
    const shop = inv.shop_detail;
    const shopIdStr = shop._id.toString();

    // Only add main shop once
    if (!shopMap[shopIdStr]) {
      const formattedMetadata = {
        ...shop.metadata,
        holiday_list: Array.isArray(shop.metadata?.holiday_list)
          ? LocalUtils.mapHolidayList(shop.metadata.holiday_list)
          : [],
      };
      shopMap[shopIdStr] = {
        id: shop.id,
        _id: shop._id,
        name: shop.name,
        code: shop.code,
        isMain: shop.is_main_branch,
        address: LocalUtils.formatAddress(shop.address),
        contact: shop.contact || {},
        metadata: formattedMetadata,
        branchCount: shop.is_main_branch ? mainShop.branches?.length || 0 : 0,
        inventory: [],
      };
    }

    shopMap[shopIdStr].inventory.push(formatInventoryItem(inv));
  });

  return shopMap;
};

// Get shop details
export const shopDetails = async (shopId: string) => {
  const mainShop: any = await getShopByIdWithBranch(shopId);
  if (!mainShop) {
    return shopNotFound();
  }

  const shopIds = [
    mainShop._id,
    ...(mainShop.branches?.map((b: any) => b._id) || []),
  ];

  if (!shopIds.length) {
    return shopNotFound();
  }

  const inventories: any = await getShopInventoryByShopId(shopIds);
  if (!inventories?.length) {
    return shopNotFound();
  }

  const shopMap = buildShopMap(inventories, mainShop);

  return successMessage(
    SUCCESS.SUCCESS_MESSAGE.SHOP_DETAILS_FETCHED,
    SUCCESS.SUCCESS_CODE.SHOP_DETAILS_FETCHED,
    Object.values(shopMap),
  );
};
