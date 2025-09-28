export const SHOP_UI_CONFIG = {
  CONTAINER_MAX_WIDTH: "xl",
  PADDING_Y: 4,
  SEARCH_MAX_WIDTH: 600,
  AVATAR_SIZE: { width: 48, height: 48 },
  SHOP_AVATAR_SIZE: { width: 40, height: 40 },
  LOADING_SPINNER_SIZE: 50
} as const;

export const SHOP_COLORS = {
  PRIMARY: "#1976d2",
  SECONDARY: "#2c3e50",
  TEXT_SECONDARY: "#6c757d",
  TEXT_MUTED: "#9e9e9e",
  SUCCESS: "#28a745",
  ERROR: "#dc3545",
  BACKGROUND: "#f8f9fa",
  BORDER: "#e0e0e0",
  HOVER_BORDER: "#1976d2"
} as const;

export const SHOP_MESSAGES = {
  HEADER_TITLE: "Shop Inventory System",
  HEADER_SUBTITLE: "Manage and browse shop inventories across all locations",
  SEARCH_PLACEHOLDER: "Search shops by shop...",
  SEARCH_BUTTON: "Search",
  CLEAR_BUTTON: "Clear",
  LOADING_ERROR: "Unable to load shops",
  NO_SHOPS_FOUND: "No shops found",
  NO_RESULTS_MESSAGE: (query: string) => `No results for "${query}". Try a different search term.`,
  NO_SHOPS_AVAILABLE: "No shops available at the moment.",
  RETRY_BUTTON: "Try Again",
  CLEAR_SEARCH: "Clear Search",
  VIEW_DETAILS: "View Details",
  MAIN_BRANCH: "Main Branch",
  BRANCHES_COUNT: (count: number) => `${count} branches`,
  PRODUCTS_COUNT: (count: number) => `${count} products across all branches`
} as const;

export const SHOP_ROUTES = {
  SHOP_DETAIL: (shopId: string) => `/shop/detail/${shopId}`
} as const;
