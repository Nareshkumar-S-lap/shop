import { ERROR } from '@common/constants/errorConstant';
import { SUCCESS } from '@common/constants/successConstant';
import { errorMessage, successMessage } from '@common/responseHelper';
import LocalUtils from '@common/utils/localUtils';
import { getShopList } from '@domain/dao/shopDao';
import { Item } from '@domain/model/productItemModel';
import { Inventory } from '@domain/model/inventoryModel';
import { Shop } from '@domain/model/shopModel';

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

export const shopDetails = async (id: string) => {
  // 1️⃣ Fetch main shop with branch shops populated (virtual)
  const mainShop: any = await Shop.findOne({ id, isActive: true })
    .populate('branches')
    .lean();
  if (!mainShop) {
    return errorMessage(
      'ERROR.ERROR_MESSAGE.SHOP_NOT_FOUND',
      'ERROR.ERROR_CODE.SHOP_NOT_FOUND',
      [],
    );
  }

  // Map holiday_list nicely
  mainShop.metadata.holiday_list = Array.isArray(
    mainShop.metadata?.holiday_list,
  )
    ? LocalUtils.mapHolidayList(mainShop.metadata.holiday_list)
    : [];

  // 2️⃣ Fetch inventory for main shop
  const mainInventory = await Inventory.find({ shop: mainShop._id.toString() })
    .populate('item')
    .lean();

  // 3️⃣ Fetch inventories for all branch shops
  const branchShopIds = mainShop.branches.map((b: any) => b._id);
  const branchInventories = await Inventory.find({
    shop: { $in: branchShopIds },
  })
    .populate('item')
    .lean();

  // 4️⃣ Attach inventories to branches
  const branchesWithInventory = mainShop.branches.map((branch: any) => ({
    ...branch,
    inventory: branchInventories.filter(
      (inv) => inv.shop.toString() === branch._id.toString(),
    ),
    metadata: {
      ...branch.metadata,
      holiday_list: Array.isArray(branch.metadata?.holiday_list)
        ? LocalUtils.mapHolidayList(branch.metadata.holiday_list)
        : [],
    },
  }));

  // 5️⃣ Format result
  const result = {
    main_shop: { ...mainShop, inventory: mainInventory },
    branches: branchesWithInventory,
  };

  return successMessage(
    'SUCCESS.SUCCESS_MESSAGE.SHOP_DETAILS_FETCHED',
    'SUCCESS.SUCCESS_CODE.SHOP_DETAILS_FETCHED',
    result,
  );
};
