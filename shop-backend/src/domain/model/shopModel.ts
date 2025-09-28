import mongoose, { Schema } from 'mongoose';
import {
  addressFields,
  contactFields,
  baseFields,
  baseSchemaOptions,
} from '@domain/common/commonFields';
import { IShop } from '@domain/common/modelTypes';
import { WeekDays } from '@common/enum/enums';
import { ERROR } from '@common/constants/errorConstant';
import { COLLECTIONS } from '@common/constants/constant';

const ShopSchema = new Schema<IShop>(
  {
    name: { type: String, required: true, index: true },
    code: { type: String, required: true, unique: true },
    is_main_branch: { type: Boolean, default: true },
    parent_shop: { type: Schema.Types.ObjectId, ref: COLLECTIONS.SHOP },
    address: addressFields,
    contact: contactFields,
    metadata: {
      opening_time: { type: String, required: true },
      closing_time: { type: String, required: true },
      established_year: { type: Number },
      holiday_list: {
        type: [Number],
        enum: Object.values(WeekDays).filter((v) => typeof v === 'number'),
        validate: {
          validator: (days: number[]) => days.every((d) => d >= 0 && d <= 6),
          message: ERROR.ERROR_MESSAGE.HOLIDAY_LIST_INVALID,
        },
        default: [],
      },
    },
    ...baseFields,
  },
  baseSchemaOptions,
);
// 🔹 Virtual to get all branch shops
ShopSchema.virtual('branches', {
  ref: COLLECTIONS.SHOP,
  localField: '_id',
  foreignField: 'parent_shop',
  justOne: false,
});
export const Shop = mongoose.model<IShop>(COLLECTIONS.SHOP, ShopSchema);
