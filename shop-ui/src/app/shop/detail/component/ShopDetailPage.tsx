"use client";

import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getShopDetails } from "@/app/shop/services/shopService";
import { Box, Typography, useMediaQuery, useTheme, Divider } from "@mui/material";
import InventoryTable from "@/app/components/inventory/InventoryTable";
import InventoryCard from "@/app/components/inventory/InventoryCard";
import BackButton from "@/app/components/BackButton";
import ShopCardDetailViewSkeleton from "@/app/components/skeletons/ShopCardDetailViewSkeleton";

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

  if (isError) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Failed to load shop details. Please try again.
        </Typography>
      </Box>
    );
  }

  if (isLoading || !selectedShop?.data) {
    return (
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        {[1, 2].map((i) => (
          <ShopCardDetailViewSkeleton key={i} />
        ))}
      </Box>
    );
  }

  if (!selectedShop.data.length) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1">No shop details found.</Typography>
      </Box>
    );
  }

  // Sort shops to show main branch first
  const sortedShops = selectedShop.data
    .slice()
    .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <BackButton />
      </Box>

      {sortedShops.map((shop) => (
        <Box key={shop.id} sx={{ width: "100%", maxWidth: 1200 }}>
          <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: "background.paper" }}>
            {/* Header */}
            <Typography variant="h5" gutterBottom>
              {shop.name}
              {shop.isMain && (
                <Typography component="span" variant="caption" color="primary" sx={{ ml: 1 }}>
                  Main Branch
                </Typography>
              )}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Code:</strong> {shop.code}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {shop.address}
            </Typography>

            <Divider sx={{ my: 2 }} />

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
                <Typography variant="subtitle1" gutterBottom>
                  Contact
                </Typography>
                <Typography>Name: {shop.contact.contact_name}</Typography>
                <Typography>Role: {shop.contact.contact_role}</Typography>
                <Typography>Phone: {shop.contact.phone}</Typography>
                <Typography>Email: {shop.contact.email}</Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Shop Info
                </Typography>
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

            <Divider sx={{ my: 2 }} />

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
