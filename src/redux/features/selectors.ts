import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { Product } from '@/types/product';

export const selectAllProducts = createSelector(
  (state: RootState) => state.api.queries["getProducts(undefined)"]?.data,
  (productsData) => productsData?.content ?? []
);

export const selectProductById = (productId: number) => createSelector(
  selectAllProducts,
  (products) => products.find((product: Product) => product.productId === productId)
);

export const selectProductByCategory = (categoryId: number, count:number) => createSelector(
  selectAllProducts,
  (products) => products.filter((product: Product) => product.category.id === categoryId)
    .slice(0, count)
);

export const selectProductBySubcategory = (subcategoryId: number, count:number) => createSelector(
  selectAllProducts,
  (products) => products.filter((product: Product) =>
    product.category.subcategories[0].id === subcategoryId).slice(0, count)
);
