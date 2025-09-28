"use client";
import React from "react";
import { Card, CardContent, Box, Avatar, Typography, Chip } from "@mui/material";
import {
  Inventory as InventoryIcon,
  LocationOn as LocationIcon,
  BusinessCenter as BusinessIcon
} from "@mui/icons-material";
import { Shop } from "@/app/shop/services/showModel";
import { getShopColor, formatShopName } from "@/app/common/shopUtils";
import { SHOP_COLORS, SHOP_MESSAGES, SHOP_UI_CONFIG } from "@/app/common/shopConstants";

interface ShopCardProps {
  shop: Shop;
  onClick: () => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onClick }) => {
  const shopColor = getShopColor(shop.name);

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderRadius: 3,
        border: `1px solid ${SHOP_COLORS.BORDER}`,
        transition: "all 0.2s ease-in-out",
        bgcolor: "white",
        "&:hover": {
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          transform: "translateY(-2px)",
          borderColor: SHOP_COLORS.HOVER_BORDER
        }
      }}
      elevation={0}
    >
      <CardContent sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar sx={{ bgcolor: shopColor, ...SHOP_UI_CONFIG.SHOP_AVATAR_SIZE }}>
              <BusinessIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="600" color={SHOP_COLORS.SECONDARY}>
                {formatShopName(shop.name)}
              </Typography>
              <Typography variant="caption" color={SHOP_COLORS.TEXT_SECONDARY} display="block">
                Branches: {shop.branch_count}
              </Typography>
            </Box>
          </Box>
          {shop.is_main_branch && (
            <Box ml={2}>
              <Chip
                label={SHOP_MESSAGES.MAIN_BRANCH}
                size="small"
                sx={{
                  bgcolor: "#e3f2fd",
                  color: SHOP_COLORS.PRIMARY,
                  fontWeight: 500,
                  fontSize: "0.75rem"
                }}
              />
            </Box>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <LocationIcon sx={{ color: SHOP_COLORS.TEXT_MUTED, fontSize: 18 }} />
          <Typography variant="body2" color={SHOP_COLORS.TEXT_SECONDARY}>
            {shop.address}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <InventoryIcon sx={{ color: SHOP_COLORS.TEXT_MUTED, fontSize: 18 }} />
          <Typography variant="body2" color="#495057" fontWeight="500">
            {SHOP_MESSAGES.PRODUCTS_COUNT(shop.product_count)}
          </Typography>
        </Box>

        {/* <Button
          variant="text"
          size="small"
          sx={{
            color: SHOP_COLORS.SUCCESS,
            fontWeight: 500,
            p: 0,
            "&:hover": { bgcolor: "transparent", textDecoration: "underline" }
          }}
        >
          {SHOP_MESSAGES.VIEW_DETAILS}
        </Button> */}
      </CardContent>
    </Card>
  );
};

export default ShopCard;
