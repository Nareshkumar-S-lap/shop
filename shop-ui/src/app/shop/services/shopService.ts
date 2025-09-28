import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "@/app/common/client";
import { ShopResponse, ShopDetailResponse } from "@/app/shop/services/showModel";

// Define the type for query params
interface ShopQueryParams {
  name?: string;
  address?: string;
}

// Define error type
interface ErrorResponse {
  message: string;
}

// Get Shop List
export const getShopList = createAsyncThunk<
  ShopResponse, // Return type
  ShopQueryParams, // Payload type
  { rejectValue: ErrorResponse } // Reject type
>("shop/getShopList", async (params, thunkAPI) => {
  try {
    const response = await client.get<ShopResponse>("/shop", { params });
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || error.message || "Unknown error"
    });
  }
});

// Get Shop Details
export const getShopDetails = createAsyncThunk<
  ShopDetailResponse, // Return type
  string, // Payload type (shop id)
  { rejectValue: ErrorResponse } // Reject type
>("shop/getShopDetails", async (id, thunkAPI) => {
  try {
    const response = await client.get<ShopDetailResponse>(`/shop/${id}`);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || error.message || "Unknown error"
    });
  }
});
