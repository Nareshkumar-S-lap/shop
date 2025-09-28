"use client";
import React from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  Paper
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon, Store as StoreIcon } from "@mui/icons-material";
import { Shop } from "../services/showModel";
import SkeletonShopCard from "@/app/components/SkeletonShopCard";
import {
  SHOP_COLORS,
  SHOP_UI_CONFIG,
  SHOP_MESSAGES,
  SHOP_ROUTES
} from "@/app/common/shopConstants";
import ShopCard from "@/app/components/ShopCard";
import { useRouter } from "next/navigation";

interface ShopListPageProps {
  searchQuery: string;
  onInputChange: (query: string) => void;
  onSearchSubmit: () => void;
  onKeyPress: (event: React.KeyboardEvent) => void;
  onClear: () => void;
  onClearInput: () => void;
  isLoading: boolean;
  isError: boolean;
  isFetched?: boolean;
  shops?: Shop[];
  onRetry: () => void;
}

const ShopListPage: React.FC<ShopListPageProps> = ({
  searchQuery,
  onInputChange,
  onSearchSubmit,
  onKeyPress,
  onClear,
  onClearInput,
  isLoading,
  isError,
  isFetched,
  shops,
  onRetry
}) => {
  const { push } = useRouter();
  const hasShops = shops && shops.length > 0;
  const showNoResults = !isLoading && !isError && isFetched && (!shops || shops.length === 0);

  return (
    <Container maxWidth={SHOP_UI_CONFIG.CONTAINER_MAX_WIDTH} sx={{ py: SHOP_UI_CONFIG.PADDING_Y }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar sx={{ bgcolor: SHOP_COLORS.PRIMARY, ...SHOP_UI_CONFIG.AVATAR_SIZE }}>
            <StoreIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight={600} color={SHOP_COLORS.SECONDARY}>
              {SHOP_MESSAGES.HEADER_TITLE}
            </Typography>
            <Typography variant="body1" color={SHOP_COLORS.TEXT_SECONDARY} sx={{ mt: 0.5 }}>
              {SHOP_MESSAGES.HEADER_SUBTITLE}
            </Typography>
          </Box>
        </Box>

        {/* Search */}
        <Box sx={{ mt: 3, maxWidth: SHOP_UI_CONFIG.SEARCH_MAX_WIDTH }}>
          <Box display="flex" gap={1}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={SHOP_MESSAGES.SEARCH_PLACEHOLDER}
              value={searchQuery}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyPress={onKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: SHOP_COLORS.TEXT_MUTED }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <Button
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClearInput();
                        onClear();
                      }}
                      sx={{
                        minWidth: "auto",
                        p: 0.5,
                        color: SHOP_COLORS.TEXT_MUTED,
                        "&:hover": {
                          color: SHOP_COLORS.PRIMARY,
                          bgcolor: "transparent"
                        }
                      }}
                    >
                      <ClearIcon fontSize="small" />
                    </Button>
                  </InputAdornment>
                )
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: "white",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: SHOP_COLORS.HOVER_BORDER
                  }
                }
              }}
            />
            <Button
              variant="contained"
              onClick={onSearchSubmit}
              sx={{
                minWidth: 100,
                borderRadius: 2,
                bgcolor: SHOP_COLORS.PRIMARY,
                "&:hover": { bgcolor: "#1565c0" }
              }}
            >
              {SHOP_MESSAGES.SEARCH_BUTTON}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Loading */}
      {isLoading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <SkeletonShopCard />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Error */}
      {!isLoading && isError && (
        <Paper elevation={0} sx={{ p: 4, textAlign: "center", bgcolor: SHOP_COLORS.BACKGROUND }}>
          <Typography color="error" variant="h6">
            {SHOP_MESSAGES.LOADING_ERROR}
          </Typography>
          <Button variant="contained" onClick={onRetry} sx={{ mt: 2 }}>
            {SHOP_MESSAGES.RETRY_BUTTON}
          </Button>
        </Paper>
      )}

      {/* Shops */}
      {!isLoading && !isError && hasShops && (
        <Grid container spacing={3}>
          {shops!.map((shop) => (
            <Grid item xs={12} md={6} lg={4} key={shop._id}>
              <ShopCard shop={shop} onClick={() => push(SHOP_ROUTES.SHOP_DETAIL(shop.id))} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Results */}
      {showNoResults && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            bgcolor: SHOP_COLORS.BACKGROUND,
            borderRadius: 3,
            border: "2px dashed #dee2e6"
          }}
        >
          <SearchIcon sx={{ fontSize: 64, color: "#adb5bd", mb: 2 }} />
          <Typography variant="h6" color="#495057" gutterBottom>
            {SHOP_MESSAGES.NO_SHOPS_FOUND}
          </Typography>
          <Typography color={SHOP_COLORS.TEXT_SECONDARY}>
            {searchQuery
              ? SHOP_MESSAGES.NO_RESULTS_MESSAGE(searchQuery)
              : SHOP_MESSAGES.NO_SHOPS_AVAILABLE}
          </Typography>
          {searchQuery && (
            <Button variant="outlined" onClick={onClear} sx={{ mt: 2 }}>
              {SHOP_MESSAGES.CLEAR_SEARCH}
            </Button>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default ShopListPage;
