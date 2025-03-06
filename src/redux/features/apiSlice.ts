// Import the RTK Query methods from the React-specific entry point
import { Product } from '@/interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ProductsResponse {
  content: Product[];
  totalElements: number;
}
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://adventure-production-f742.up.railway.app/api' }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/blog/posts',
    }),
    getProducts: builder.query<ProductsResponse, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // 1. Запрашиваем первую страницу (10 элементов)
        const firstResponse = await fetchWithBQ('/public/products?page=0&size=10');
        if (firstResponse.error) return { error: firstResponse.error };
        const firstData = firstResponse.data as ProductsResponse;
        // 2. Получаем общее количество
        const totalElements = firstData.totalElements;
        // 3. Если totalElements больше 10, делаем повторный запрос
        if (totalElements > 10) {
          const fullResponse = await fetchWithBQ(`/public/products?page=0&size=${totalElements}`);
          if (fullResponse.error) return { error: fullResponse.error };
          return { data: fullResponse.data as ProductsResponse};
        }
        return { data: firstData as ProductsResponse };
      },
    }),
    getReviewsByProductId: builder.query({
      query: ({ productId }) => `/public/products/reviews?productId=${productId}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetProductsQuery, useGetReviewsByProductIdQuery } = apiSlice;
