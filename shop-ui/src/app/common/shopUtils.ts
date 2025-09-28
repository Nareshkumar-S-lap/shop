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
