import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { Product } from '@/interfaces/product';

export const selectAllProducts = createSelector(
  (state: RootState) => state.api.queries["getProducts(undefined)"]?.data,
  (productsData) => productsData?.content ?? []
);

export const selectProductById = (productId: number) => createSelector(
  selectAllProducts,
  (products) => products.find((product: Product) => product.productId === productId)
);
