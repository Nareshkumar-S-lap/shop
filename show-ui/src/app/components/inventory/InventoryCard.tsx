"use client";
import React from "react";
import { Grid, Card, CardContent, Typography, Box, Chip } from "@mui/material";

const InventoryCard: React.FC<{ inventory: any[] }> = ({ inventory }) => {
  return (
    <Grid container spacing={2}>
      {inventory.map((item) => (
        <Grid item xs={12} key={item.item_code}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                {item.item_name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
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
                  className="mr-2"
                />
                <Chip
                  label={item.needsReorder ? "Reorder Needed" : "Stock OK"}
                  color={item.needsReorder ? "error" : "default"}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoryCard;
