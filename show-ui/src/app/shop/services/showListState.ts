import {
  ShopDetailResponse,
  ShopResponse,
} from "@/app/shop/services/showModel";

// Define the state interface
export interface ShopState {
  items: ShopResponse | null;
  originalItems: ShopResponse | null;
  selectedShop: ShopDetailResponse | null;
  selectedId: string | null;
  searchText: string | null;
  isError: boolean;
  isLoading: boolean;
  isFetched: boolean;
}

