import { JOIN_COLLECTIONS_FIELD } from '@common/constants/constant';
import { Inventory } from '@domain/model/inventoryModel';

export const getShopInventoryByShopId = async (shopIds: string[]) => {
  return Inventory.find({
    shop_detail: { $in: shopIds },
    isActive: true,
  })
    .populate({
      path: JOIN_COLLECTIONS_FIELD.SHOP_DETAIL,
      match: { isActive: true },
    })
    .populate({
      path: JOIN_COLLECTIONS_FIELD.ITEM_DETAIL,
      match: { isActive: true },
    })
    .lean();
};

export const getProductCount = (shopIds: string[]) => {
  return Inventory.countDocuments({
    shop_detail: { $in: shopIds },
    isActive: true,
  });
};
