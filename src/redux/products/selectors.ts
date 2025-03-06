import { RootState } from "@/redux/store";

export const selectPage = (state: RootState) => state.products.page;

export const selectTotalPage = (state: RootState) => state.products.totalPages;

export const selectTotalElements = (state: RootState) =>
  state.products.totalElements;

export const selectSize = (state: RootState) => state.products.size;

export const selectFilteredProducts = (state: RootState) =>
  state.products.filteredProducts;
