"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <StoreIcon color="primary" />
            <Typography variant="h6" color="primary" fontWeight={600}>
              ShopFinder
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Button color="inherit">Home</Button>
            <Button color="inherit">About</Button>
            <Button color="inherit">Contact</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
