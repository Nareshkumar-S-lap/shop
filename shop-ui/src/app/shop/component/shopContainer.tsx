"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/store";
import { getShopList } from "../services/shopService";
import { useShopSearch } from "@/app/shop/services/useShopSearch";
import ShopListPage from "@/app/shop/component/shopList";

const ShopContainer = () => {
  const dispatch = useAppDispatch();
  const shopStore = useAppSelector((state) => state.shop);
  const hasFetched = useRef(false);

  const {
    searchQuery,
    handleInputChange,
    handleSearchSubmit,
    handleKeyPress,
    handleClear,
    handleClearInput,
    handleRetry
  } = useShopSearch();

  useEffect(() => {
    if (!hasFetched.current) {
      dispatch(getShopList({}));
      hasFetched.current = true;
    }
  }, [dispatch]);

  return (
    <ShopListPage
      searchQuery={searchQuery}
      onInputChange={handleInputChange}
      onSearchSubmit={handleSearchSubmit}
      onKeyPress={handleKeyPress}
      onClear={handleClear}
      onClearInput={handleClearInput}
      isLoading={shopStore.isLoading}
      isError={shopStore.isError}
      isFetched={shopStore.isFetched}
      shops={shopStore.items?.data ?? []}
      onRetry={handleRetry}
    />
  );
};

export default ShopContainer;
