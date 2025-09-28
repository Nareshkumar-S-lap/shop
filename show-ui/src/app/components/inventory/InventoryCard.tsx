"use client";
import React from "react";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

interface InventoryItem {
  item_code: string;
  item_name: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  status: string;
  needsReorder: boolean;
}

const InventoryCard: React.FC<{ inventory: InventoryItem[] }> = ({ inventory }) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {inventory.map((item) => (
        <Box
          key={item.item_code}
          flex="1 1 calc(50% - 16px)" // 2 per row on medium+ screens
          minWidth={280} // fallback for small screens
        >
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {item.item_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Code: {item.item_code}
              </Typography>
              <Typography>Category: {item.category}</Typography>
              <Typography>Brand: {item.brand}</Typography>
              <Typography>Qty: {item.quantity}</Typography>
              <Typography>Price: ₹{item.price}</Typography>
              <Box mt={1}>
                <Chip
                  label={item.status}
                  color={
                    item.status === "Low Stock"
                      ? "warning"
                      : item.status === "Out of Stock"
                        ? "error"
                        : "success"
                  }
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={item.needsReorder ? "Reorder Needed" : "Stock OK"}
                  color={item.needsReorder ? "error" : "default"}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default InventoryCard;
