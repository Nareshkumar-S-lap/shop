"use client";

import React from "react";
import { Card, CardContent, Box, Skeleton } from "@mui/material";
import { SHOP_UI_CONFIG, SHOP_COLORS } from "@/app/common/shopConstants";

const SkeletonShopCard: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: `1px solid ${SHOP_COLORS.BORDER}`,
        bgcolor: "white"
      }}
      elevation={0}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Top Row: Avatar + Shop Name + Branch */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Skeleton
              variant="circular"
              width={SHOP_UI_CONFIG.SHOP_AVATAR_SIZE.width}
              height={SHOP_UI_CONFIG.SHOP_AVATAR_SIZE.height}
            />
            <Box>
              <Skeleton width={120} height={24} sx={{ mb: 0.5 }} />
              <Skeleton width={80} height={16} />
            </Box>
          </Box>
          <Skeleton width={60} height={24} />
        </Box>

        {/* Address Row */}
        <Box display="flex" alignItems="center" gap={1} mb={2.5}>
          <Skeleton variant="rectangular" width={16} height={16} />
          <Skeleton width="80%" height={18} />
        </Box>

        {/* Product Count Row */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Skeleton variant="rectangular" width={16} height={16} />
          <Skeleton width="40%" height={18} />
        </Box>

        {/* View Details Button */}
        <Box>
          <Skeleton width={90} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkeletonShopCard;
