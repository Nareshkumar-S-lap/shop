"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getShopList } from "@/app/shop/services/shopService";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const ShopListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { items, isLoading, isError } = useAppSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getShopList({}));
  }, [dispatch]);

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
        Failed to load shops. Please try again.
      </Typography>
    );
  }

  if (!items || items.data.length === 0) {
    return (
      <Typography align="center" mt={4}>
        No shops found.
      </Typography>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-4 justify-center">
        {items.data.map((shop: any) => (
          <Card
            key={shop._id}
            onClick={() => push(`/shop/detail/${shop.id}`)}
            className="w-full sm:w-[48%] md:w-[31%] hover:shadow-lg transition cursor-pointer"
          >
            <CardContent>
              <Typography variant="h6">{shop.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {shop.address.line1}, {shop.address.city}, {shop.address.state}
              </Typography>
              {shop.is_main_branch && (
                <Typography variant="caption" color="primary">
                  Main Branch
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopListPage;
