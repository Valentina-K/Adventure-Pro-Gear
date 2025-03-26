'use client';

import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'https://adventure-production.up.railway.app/',
  baseURL: 'https://adventure-production-f742.up.railway.app/',
});

axios.defaults.withCredentials = true;

export const getAllReviewsByProductId = async (productId: number) => {
  try {
    const reviews = await axiosInstance.get(`api/public/products/reviews?productId=${productId}`);
    return reviews;
  } catch (error) {
    console.log('from getAllReviews');
  }
};

export const getProductByName = async (productName: string) => {
  console.log(productName);
  try {
    const products = await axiosInstance.get(`api/public/products/search?name=${productName}`);
    return products;
  } catch (error) {
    console.log('from getProductByName');
  }
};

export const createReview = async (data: any, token: string) => {
  const { productId, comment, rating } = data;
  try {
    const response = await axiosInstance.post(
      'api/public/products/reviews',
      {
        productId,
        comment,
        rating,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addLike = async (id: number) => {
  return await axiosInstance.post(`api/public/products/reviews/${id}/like`);
};

export const addDislike = async (id: number) => {
  return await axiosInstance.post(`api/public/products/reviews/${id}/dislike`);
};

export const addUnlike = async (id: number) => {
  return await axiosInstance.post(`api/public/products/reviews/${id}/unlike`);
};

export const addUnDislike = async (id: number) => {
  return await axiosInstance.post(`api/public/products/reviews/${id}/undislike`);
};

export const getCategory = async () => {
  try {
    const { data } = await axiosInstance.get(`api/public/sections`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSubcategoryId = async (subcategoryId: string) => {
  try {
    const products = await axiosInstance.get(
      `api/public/categories/subsubcategory/${subcategoryId}`
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsFilter = async (
  {
    page,
    priceFrom,
    priceTo,
    subcategoryId,
  }: { page: string; subcategoryId: string; priceFrom: string; priceTo: string}
) => {
  try {
    const products = await axiosInstance.get(
      `api/public/products/filter?page=${page}&size=10&priceFrom=${priceFrom}&priceTo=${priceTo}`
      // subcategoryId=${subcategoryId}`
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};