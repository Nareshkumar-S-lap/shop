"use client";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getShopDetails } from "@/app/shop/services/shopService";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
} from "@mui/material";

const ShopDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedShop, isLoading, isError } = useAppSelector(
    (state) => state.shop
  );

  useEffect(() => {
    if (id) {
      dispatch(getShopDetails(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load shop details. Please try again.
      </Typography>
    );
  }

  if (!selectedShop?.data || selectedShop.data.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No shop details found.
      </Typography>
    );
  }

  // sort shops: main branch first
  const sortedShops = selectedShop.data
    .slice()
    .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0));

  return (
    <div className="p-4 flex flex-col items-center">
      <Button
        variant="outlined"
        className="mb-4 self-start"
        onClick={() => router.back()}
      >
        ← Back to Shops
      </Button>

      {sortedShops.map((shopDetail) => (
        <Card key={shopDetail.id} className="w-full max-w-3xl mb-4">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {shopDetail.name} {shopDetail.isMain && "(Main Branch)"}
            </Typography>
            <Typography variant="body1">Code: {shopDetail.code}</Typography>
            <Typography variant="body2" color="textSecondary">
              {shopDetail.address}
            </Typography>

            <Divider className="my-2" />

            <Typography variant="subtitle1">Contact Info</Typography>
            <Typography>Phone: {shopDetail.contact.phone}</Typography>
            <Typography>Email: {shopDetail.contact.email}</Typography>
            <Typography>Name: {shopDetail.contact.contact_name}</Typography>

            <Divider className="my-2" />

            <Typography variant="subtitle1">Inventory</Typography>
            {shopDetail.inventory.length ? (
              shopDetail.inventory.map((item) => (
                <Box
                  key={item.item_code}
                  className="border p-2 my-1 rounded-md"
                >
                  <Typography>{item.item_name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.category} | {item.brand} | Qty: {item.quantity} |
                    Price: ₹{item.price}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No inventory items found.</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShopDetailPage;
