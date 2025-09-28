export interface InventoryItem {
  item_code: string;
  item_name: string;
  description: string;
  category: string;
  brand: string;
  unit: string;
  tags: string[];
  price: number;
  quantity: number;
  reorder_level: number;
  status: string;
  needsReorder: boolean;
}

export interface ShopDetailItem {
  _id: string;
  id: string;
  name: string;
  code: string;
  isMain: boolean;
  address: string;
  contact: ShopContact;
  metadata: ShopMetadata;
  branchCount: number;
  inventory: InventoryItem[];
}

export interface ShopDetailResponse {
  success: number;
  code: string;
  message: string;
  data: ShopDetailItem[];
}

export interface ShopAddress {
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ShopContact {
  phone: string;
  email: string;
  contact_name: string;
  contact_role: string;
}

export interface ShopMetadata {
  opening_time: string;
  closing_time: string;
  holiday_list: string[];
}

export interface Shop {
  _id: string;
  id: string;
  name: string;
  code: string;
  is_main_branch: boolean;
  parent_shop: string | null;
  address: ShopAddress;
  contact: ShopContact;
  metadata: ShopMetadata;
  createdAt: string;
  updatedAt: string;
  branch_count: number;
}

export interface ShopResponse {
  success: number;
  code: string;
  message: string;
  data: Shop[];
}
