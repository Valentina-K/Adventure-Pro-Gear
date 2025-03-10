import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/interfaces/product';

interface ProductState {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  filteredProducts: Product[];
}

const initialState: ProductState = {
  page: 0,
  size: 10,
  totalPages: 0,
  totalElements: 0,
  filteredProducts: [],
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
      console.log("setFilteredProducts action.payload", action.payload);
      state.filteredProducts = action.payload;
    },
  },
});

export const { setPage, setSize, setTotalPages, setTotalElements, setFilteredProducts } =
  productsSlice.actions;

export default productsSlice.reducer;
