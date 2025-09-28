import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getShopList, getShopDetails } from "@/app/shop/services/shopService";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "@/app/common/state";
import {
  ShopResponse,
  ShopDetailResponse,
} from "@/app/shop/services/showModel";
import { ShopState } from "@/app/shop/services/showListState";

// Initial state
const initialState: ShopState = {
  items: null,
  originalItems: null,
  selectedShop: null,
  selectedId: null,
  searchText: null,
  isError: false,
  isLoading: false,
  isFetched: false,
};

// Create the slice
export const shopSlice = createSlice({
  name: "Shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getShopList
      .addCase(getShopList.pending, (state) => {
        pendingState(state);
      })
      .addCase(
        getShopList.fulfilled,
        (state, action: PayloadAction<ShopResponse>) => {
          fulfilledState(state);
          if (action.payload && Array.isArray(action.payload.data)) {
            state.items = action.payload;
            state.originalItems = action.payload;
            state.searchText = null;
          } else {
            state.items = null;
          }
        }
      )
      .addCase(getShopList.rejected, (state, action: PayloadAction<any>) => {
        rejectedState(state);
      })

      // getShopDetails
      .addCase(getShopDetails.pending, (state) => {
        pendingState(state);
      })
      .addCase(
        getShopDetails.fulfilled,
        (state, action: PayloadAction<ShopDetailResponse>) => {
          fulfilledState(state);
          state.selectedShop = action.payload;
        }
      )
      .addCase(getShopDetails.rejected, (state, action: PayloadAction<any>) => {
        rejectedState(state);
      });
  },
});

export default shopSlice.reducer;
