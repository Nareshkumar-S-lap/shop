// hooks/useShopSearch.ts
import { useState, useCallback } from "react";
import { useAppDispatch } from "@/app/store/store";
import { getShopList } from "../services/shopService";

export const useShopSearch = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const performSearch = useCallback(
    (query: string) => {
      dispatch(getShopList({ name: query.trim() }));
    },
    [dispatch]
  );

  const handleInputChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    performSearch(searchQuery);
  }, [performSearch, searchQuery]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        performSearch(searchQuery);
      }
    },
    [performSearch, searchQuery]
  );

  const handleRetry = useCallback(() => {
    dispatch(getShopList({ name: searchQuery.trim() }));
  }, [dispatch, searchQuery]);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    dispatch(getShopList({}));
  }, [dispatch]);

  const handleClearInput = useCallback(() => {
    setSearchQuery("");
  }, []);

  return {
    searchQuery,
    handleInputChange,
    handleSearchSubmit,
    handleKeyPress,
    handleClear,
    handleClearInput,
    handleRetry,
    performSearch
  };
};
