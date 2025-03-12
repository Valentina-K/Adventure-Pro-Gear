import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/interfaces/product';
import { act } from 'react';

interface ProductState {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  filteredProducts: Product[];
  reviewedProducts: Product[];
}

const initialState: ProductState = {
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  filteredProducts: [],
  reviewedProducts: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<any>) {
      state.page = action.payload;
    },
    setSize(state, action: PayloadAction<any>) {
      state.size = action.payload;
    },
    setTotalPages(state, action: PayloadAction<any>) {
      state.totalPages = action.payload;
    },
    setTotalElements(state, action: PayloadAction<any>) {
      state.totalElements = action.payload;
    },
    setFilteredProducts(state, action: PayloadAction<any>) {
      state.filteredProducts = action.payload;
    },
    setReviewedProducts(state, action: PayloadAction<any>) {
      const index = state.reviewedProducts.findIndex(
        product => product.productId === action.payload.productId
      );
      if (index === -1) state.reviewedProducts.push(action.payload);
    },
  },
});

export const {
  setPage,
  setSize,
  setTotalPages,
  setTotalElements,
  setFilteredProducts,
  setReviewedProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
