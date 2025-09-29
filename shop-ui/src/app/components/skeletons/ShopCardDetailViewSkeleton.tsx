"use client";

import React from "react";
import { Card, CardContent, Skeleton, Box, useMediaQuery, useTheme } from "@mui/material";

const ShopCardDetailViewSkeleton: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ width: "100%", maxWidth: 1200, mb: 4, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Header Skeleton */}
        <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="20%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />

        {/* Divider */}
        <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />

        {/* Contact & Shop Info Skeleton */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            mb: 3
          }}
        >
          <Box sx={{ flex: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${60 + i * 8}%`}
                height={20}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
          <Box sx={{ flex: 1 }}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="text"
                width={`${50 + i * 10}%`}
                height={20}
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </Box>

        {/* Divider */}
        <Skeleton variant="rectangular" height={1} sx={{ mb: 2 }} />

        {/* Inventory Skeleton */}
        {isMobile ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={120} />
            ))}
          </Box>
        ) : (
          <Skeleton variant="rectangular" height={200} />
        )}
      </CardContent>
    </Card>
  );
};

export default ShopCardDetailViewSkeleton;
