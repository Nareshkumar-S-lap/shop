import mongoose, { Schema } from "mongoose";
import { addressFields, contactFields, baseFields, baseSchemaOptions } from "@domain/common/commonFields";
import { IShop } from "@domain/common/modelTypes";

const ShopSchema = new Schema<IShop>(
    {
        name: { type: String, required: true, index: true },
        code: { type: String, required: true, unique: true },
        is_main_branch: { type: Boolean, default: true },
        parent_shop: { type: Schema.Types.ObjectId, ref: "shops" },
        address: addressFields,
        contact: contactFields,
        metadata: {
            opening_time: { type: String, required: true },
            closing_time: { type: String, required: true },
            established_year: { type: Number },
            holiday_list: {
                type: [Number],
                validate: {
                    validator: (days: number[]) => days.every((d) => d >= 0 && d <= 6),
                    message: "Holiday list must be numbers between 0–6",
                },
                default: [],
            },
        },
        ...baseFields,
    },
    baseSchemaOptions // ✅ timestamps
);
export const Shop = mongoose.model<IShop>("shops", ShopSchema);
