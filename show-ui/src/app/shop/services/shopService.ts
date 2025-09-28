import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ShopDetailResponse,
  ShopResponse,
} from "@/app/shop/services/showModel";
import client from "@/app/common/client";

// Define the type for query params
interface ShopQueryParams {
  name?: string;
  address?: string;
}

// Define error type
interface ErrorResponse {
  message: string;
}

export const getShopList = createAsyncThunk<
  ShopResponse, // Return type
  ShopQueryParams, // Payload type (query params)
  { rejectValue: ErrorResponse } // Typed error for rejectWithValue
>("shop/getShopList", async (params: any, thunkAPI: any) => {
  try {
    const response = await client.get<ShopResponse>("/shop", {
      params,
    });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message:
        error.response?.data?.message || error.message || "Unknown error",
    });
  }
});

export const getShopDetails = createAsyncThunk<ShopDetailResponse, string>(
  "shop/getShopDetails",
  async (id: string) => {
    const response = await client.get<ShopDetailResponse>(`/shop/${id}`);
    return response.data;
  }
);
