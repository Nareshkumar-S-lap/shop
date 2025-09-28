"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getShopDetails } from "@/app/shop/services/shopService";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import InventoryTable from "@/app/components/inventory/InventoryTable";
import InventoryCard from "@/app/components/inventory/InventoryCard";
import BackButton from "@/app/components/BackButton";
import ShopCardDetailViewSkeleton from "@/app/components/ShopCardDetailViewSkeleton";

const ShopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedShop, isLoading, isError } = useAppSelector((state) => state.shop);

  const hasFetched = useRef(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getShopDetails(id));
      hasFetched.current = true;
    }
  }, [id, dispatch]);

  // Error state
  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load shop details. Please try again.
      </Typography>
    );
  }

  // Loading state - show skeletons
  if (isLoading || !selectedShop?.data) {
    return (
      <Box className="p-4 flex flex-col items-center w-full">
        <BackButton />
        {[1, 2].map((i) => (
          <ShopCardDetailViewSkeleton key={i} />
        ))}
      </Box>
    );
  }

  // No data
  if (!selectedShop.data.length) {
    return (
      <Typography align="center" mt={4}>
        No shop details found.
      </Typography>
    );
  }

  // Sort shops to show main branch first
  const sortedShops = selectedShop.data
    .slice()
    .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));

  return (
    <Box className="p-4 flex flex-col items-center w-full">
      <BackButton />

      {sortedShops.map((shop) => (
        <Box key={shop.id} className="w-full max-w-5xl mb-6">
          <Box className="p-4 shadow-md border rounded-md bg-white">
            {/* Header */}
            <Typography variant="h5" gutterBottom>
              {shop.name}{" "}
              {shop.isMain && (
                <Typography component="span" variant="caption" color="primary" sx={{ ml: 1 }}>
                  Main Branch
                </Typography>
              )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Code:</strong> {shop.code}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {shop.address}
            </Typography>

            <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />

            {/* Contact & Shop Info */}
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 4,
                mb: 3
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">Contact</Typography>
                <Typography>Name: {shop.contact.contact_name}</Typography>
                <Typography>Role: {shop.contact.contact_role}</Typography>
                <Typography>Phone: {shop.contact.phone}</Typography>
                <Typography>Email: {shop.contact.email}</Typography>
              </Box>

              <Box sx={{ flex: 1, mt: isMobile ? 2 : 0 }}>
                <Typography variant="subtitle1">Shop Info</Typography>
                <Typography>Opening Time: {shop.metadata.opening_time}</Typography>
                <Typography>Closing Time: {shop.metadata.closing_time}</Typography>
                <Typography>
                  Holidays:{" "}
                  {shop.metadata.holiday_list.length
                    ? shop.metadata.holiday_list.join(", ")
                    : "None"}
                </Typography>
                <Typography>Branches: {shop.branchCount}</Typography>
              </Box>
            </Box>

            <Box sx={{ my: 2, borderBottom: "1px solid #e0e0e0" }} />

            {/* Inventory Section */}
            <Typography variant="h6" gutterBottom>
              Inventory
            </Typography>

            {!shop.inventory.length ? (
              <Typography>No inventory items found.</Typography>
            ) : isMobile ? (
              <InventoryCard inventory={shop.inventory} />
            ) : (
              <InventoryTable inventory={shop.inventory} />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ShopDetailPage;
