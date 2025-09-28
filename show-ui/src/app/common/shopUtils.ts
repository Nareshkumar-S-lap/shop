export const getProductCount = (shopId: string): number => {
  const seed = shopId.charCodeAt(0) + shopId.length;
  return 3 + (seed % 12); // Random between 3-15
};

export const getShopColor = (shopName: string): string => {
  const colors = [
    "#1976d2",
    "#388e3c",
    "#f57c00",
    "#7b1fa2",
    "#c2185b",
    "#00796b",
    "#5d4037",
    "#455a64"
  ];
  const index = shopName.charCodeAt(0) % colors.length;
  return colors[index];
};

export const formatShopName = (shopName: string): string => {
  return shopName.replace(/\b\w+\b$/, (match) => match.split(" ").pop() || "");
};

export const formatShopAddress = (address: any): string => {
  return `${address.city}, ${address.state} ${address.postal_code}`;
};
