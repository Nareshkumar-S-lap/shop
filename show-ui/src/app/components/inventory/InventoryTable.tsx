"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";

const InventoryTable: React.FC<{ inventory: any[] }> = ({ inventory }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Reorder?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.item_code}>
              <TableCell>{item.item_code}</TableCell>
              <TableCell>{item.item_name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>₹{item.price}</TableCell>
              <TableCell>
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
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={item.needsReorder ? "Yes" : "No"}
                  color={item.needsReorder ? "error" : "default"}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
