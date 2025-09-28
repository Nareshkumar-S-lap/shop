import { Shop } from '@domain/model/shopModel';

export const getShopList = async (payload: any) =>
  Shop.find(payload).populate('parent_shop').select('-__v -isActive').lean();

export const getShopById = async (id: string) =>
  Shop.findOne({ id, isActive: true }).lean();
