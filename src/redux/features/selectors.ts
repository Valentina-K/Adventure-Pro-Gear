import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { apiSlice } from '@/redux/features/apiSlice';

export const selectAllProducts = createSelector(
  (state: RootState) => apiSlice.endpoints.getProducts.select()(state),
  (productsQuery) => productsQuery?.data?.content ?? []
);

export const selectProductById = (productId: number) => createSelector(
  selectAllProducts,
  (products) => products.find(product => product.productId === productId)
);
