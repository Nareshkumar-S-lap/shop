import { Item } from '@domain/model/productItemModel';
import { Shop } from '@domain/model/shopModel';

export const getShopList = async (payload: any) =>
  Shop.find(payload).populate('parent_shop').select('-__v -isActive').lean();

export const getShopById = async (id: string) =>
  Shop.findOne({ id, isActive: true }).lean();

export const getShopItem = async (id: string) =>
  Item.findOne({ id, isActive: true }).lean();

export const getShopByIdWithBranch = async (id: string) =>
  Shop.findOne({ id, isActive: true }).populate('branches').lean();
