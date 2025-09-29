'use client';

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.defaults.withCredentials = true;

export const verifyEmail = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.get<{ success: boolean; message: string }>(
      `api/public/registration/confirmation?token=${token}`
    );
    return response.data; 
  } catch (error: any) {
    if (error.response?.data) {
      return {
        success: false,
        message: error.response.data.message ?? "Ошибка верификации",
      };
    }   
    return {
      success: false,
      message: error.message ?? "Неизвестная ошибка",
    };
  }
};

export const getAllReviewsByProductId = async (productId: number) => {
  try {
    const reviews = await axiosInstance.get(`api/public/products/reviews?productId=${productId}`);
    return reviews;
  } catch (error) {
    console.log('from getAllReviews', error);
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

export const deleteReview = async (id: number, token: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/public/products/reviews/${id}`,
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

export const toggleLike = async (id: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/public/products/reviews/${String(id)}/toggle-like`,
      {},
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
  // return await axiosInstance.post(`api/public/products/reviews/${id}/like`);
};

export const toggleDislike = async (id: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `api/public/products/reviews/${String(id)}/toggle-dislike`,
      {},
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

export const getProductsFilter = async ({
  // page,
  // priceFrom,
  // priceTo,
  subcategoryId,
}: {
  // page: string;
  subcategoryId: string;
  // priceFrom: string;
  // priceTo: string;
}) => {
  try {
    const products = await axiosInstance.get(
      `api/public/products/filter?page=0&subcategoryId=${subcategoryId}`
    );
    return products;
  } catch (error) {
    console.log(error);
  }
};
