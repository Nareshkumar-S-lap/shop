import mongoose, { Schema } from 'mongoose';
import { baseFields, baseSchemaOptions } from '@domain/common/commonFields';
import { IInventory } from '@domain/common/modelTypes';
import { COLLECTIONS } from '@common/constants/constant';
import { InventoryStatus } from '@common/enum/enums';

const InventorySchema = new Schema<IInventory>(
  {
    ...baseFields,
    shop: {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.SHOP,
      required: true,
      index: true,
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: COLLECTIONS.ITEM,
      required: true,
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    reorder_level: { type: Number, default: 10 },
    last_restock_date: { type: Date },
    status: {
      type: Number,
      enum: Object.values(InventoryStatus).filter((v) => typeof v === 'number'),
      default: InventoryStatus.IN_STOCK,
      required: true,
    },
  },
  baseSchemaOptions,
);

InventorySchema.index({ shop: 1, item: 1 }, { unique: true });

export const Inventory = mongoose.model<IInventory>(
  COLLECTIONS.INVENTORY,
  InventorySchema,
);
