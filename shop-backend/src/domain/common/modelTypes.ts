import { Document, Types } from 'mongoose';
import { addressFields, contactFields } from './commonFields';
import { InventoryStatus, WeekDays } from '@common/enum/enums';

export interface IBase extends Document {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IShop extends IBase {
  name: string;
  code: string;
  is_main_branch: boolean;
  parent_shop?: Types.ObjectId;
  address: typeof addressFields;
  contact: typeof contactFields;
  metadata: {
    opening_time: string;
    closing_time: string;
    established_year?: number;
    holiday_list: WeekDays[];
  };
}
export interface IItem extends IBase {
  name: string;
  description: string;
  item_code: string;
  category: string;
  brand?: string;
  unit: string;
  tags?: string[];
}

export interface IInventory extends IBase {
  shop_detail: Types.ObjectId;
  item_detail: Types.ObjectId;
  price: number;
  quantity: number;
  reorder_level?: number;
  last_restock_date?: Date;
  status: InventoryStatus;
}
