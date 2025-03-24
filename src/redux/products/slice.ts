import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, Product } from '@/types/product';

interface ProductState {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  filteredProducts: Product[];
  reviewedProducts: Product[];
  cart: Cart | null;
}

const initialState: ProductState = {
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  filteredProducts: [],
  reviewedProducts: [],
  cart: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<any>) {
      return { ...state, page: action.payload };
    },
    setSize(state, action: PayloadAction<any>) {
      return { ...state, size: action.payload };
    },
    setTotalPages(state, action: PayloadAction<any>) {
      return { ...state, totalPages: action.payload };
    },
    setTotalElements(state, action: PayloadAction<any>) {
      return { ...state, totalElements: action.payload };
    },
    setFilteredProducts(state, action: PayloadAction<any>) {
      return { ...state, filteredProducts: action.payload };
    },
    setReviewedProducts(state, action: PayloadAction<any>) {
      const index = state.reviewedProducts.findIndex(
        product => product.productId === action.payload.productId
      );
      if (index === -1) state.reviewedProducts.push(action.payload);
    },
    setShoppingCart(state, action: PayloadAction<any>) {
      return { ...state, cart: action.payload };
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
  setShoppingCart,
} = productsSlice.actions;

export default productsSlice.reducer;
