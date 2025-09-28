export enum InventoryStatus {
  OUT_OF_STOCK = 0,
  LOW_STOCK = 1,
  IN_STOCK = 2,
}

export const INVENTORY_STATUS_TEXT: Record<number, string> = {
  0: 'Out of Stock',
  1: 'Low Stock',
  2: 'In Stock',
};

// Enum for weekdays
export enum WeekDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}
