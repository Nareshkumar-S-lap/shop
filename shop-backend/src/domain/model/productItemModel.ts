import mongoose, { Schema } from 'mongoose';
import { baseFields, baseSchemaOptions } from '@domain/common/commonFields';
import { IItem } from '@domain/common/modelTypes';
import { COLLECTIONS } from '@common/constants/constant';

const ItemSchema = new Schema<IItem>(
  {
    ...baseFields,
    name: { type: String, required: true, index: true },
    description: { type: String },
    item_code: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    brand: { type: String },
    unit: { type: String, required: true },
    tags: [{ type: String }],
  },
  baseSchemaOptions,
);

export const Item = mongoose.model<IItem>(COLLECTIONS.ITEM, ItemSchema);
