import axios from 'axios';
import { getServerSession } from 'next-auth';
import options from '@/config/nextAuth';

export const token: { access: string | null; refresh: string | null } = {
  access: null,
  refresh: null,
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  /* headers: {
    'ngrok-skip-browser-warning': 'true',
  }, */
});

const refreshAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getServerSession(options);
    const publicEndpoints = [
      'api/public/auth/refresh_token',
      'api/public/password-reset/request',
      'api/public/password-reset/reset',
      'api/public/products',
      'api/public/auth/login',
      'api/public/product',
      'api/blog/posts',
    ];
    const needsAuth = !publicEndpoints.some(endpoint => config?.url?.startsWith(endpoint));

    if (needsAuth && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const refreshTokenService = async (refreshToken: string) => {
  try {
    const res = await refreshAxios.post('api/public/auth/refresh_token', {
      refreshToken: `Bearer ${refreshToken}`,
    });
    return res.data;
  } catch (error) {
    return {
      error: 'RefreshAccessTokenError',
    };
  }
};

export const getProducts = async () => {
  try {
    const products = await axiosInstance.get('api/public/products');
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (productId: number) => {
  try {
    const product = await axiosInstance.get(`api/public/products/${productId}`);
    return product.data;
  } catch (error) {
    console.log('from getProductById');
  }
};

export const getReviewsById = async (id: number) => {
  try {
    const review = await axiosInstance.get(`api/public/products/reviews/${id}`);
    return review;
  } catch (error) {
    console.log('from getReviewsById');
  }
};

export const getAverageRatingByProductId = async (productId: number) => {
  try {
    const averageRating = await axiosInstance.get(
      `api/public/products/reviews/average-rating?productId=${productId}`
    );
    return averageRating;
  } catch (error) {
    console.log('from getAverageRatingByProductId');
  }
};

export const getAllReviews = async (productId: number) => {
  try {
    const reviews = await axiosInstance.get(`api/public/products/reviews?productId=${productId}`);
    return reviews;
  } catch (error) {
    console.log('from getAllReviews');
  }
};

export const signUpService = async (credentials: any) => {
  const { name, surname, email, password } = credentials;
  const result = await axiosInstance.post('api/public/registration/register', {
    name,
    surname,
    email,
    password,
  });
  return result;
};

export const signInService = async (credentials: any) => {
  const { email, password } = credentials;
  const response = await axiosInstance.post('api/public/auth/login', { email, password });
  // console.log('AxiosResponse: ', response);
  return response;
};

export const getUserInfoService = async (accessToken: any) => {
  try {
    const response = await axiosInstance.get('api/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to retrieve user information:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const forgotPasswordService = async (email: FormDataEntryValue) => {
  try {
    const sendEmail = await axiosInstance.post('api/public/password-reset/request', {
      email,
    });
    return sendEmail.status;
  } catch (error) {
    console.log(error);
  }
};

export const resetPasswordService = async (
  resetToken: FormDataEntryValue | null,
  newPassword: FormDataEntryValue,
  confirmPassword: FormDataEntryValue
) => {
  try {
    const resetPassword = await axiosInstance.post('api/public/password-reset/reset', {
      token: resetToken,
      newPassword,
      confirmPassword,
    });
    return resetPassword.status;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  const result = await axiosInstance.get('api/users');
  /* return {data:undefined}; */ return result;
};

export const deletePost = async (id: string) => {
  const result = await axiosInstance.delete(`api/v1/products/${id}`);
  /* return {data:undefined}; */ return result;
};

export const getUserService = async () => {
  try {
    const response = await axiosInstance.get('api/users/me');
    return response.data;
  } catch (error: any) {
    console.error('Failed to retrieve user information:', error);
    return error?.response?.data || error?.message;
  }
};

export const updateUserDataService = async (personalData: any) => {
  try {
    const response = await axiosInstance.put('api/users/me/update', personalData);
    return response.data;
  } catch (error: any) {
    return error?.response?.data || error?.message;
  }
};

export const updatePasswordService = async (personalData: any) => {
  try {
    const response = await axiosInstance.put('api/users/me/update-password', personalData);
    return response.data;
  } catch (error: any) {
    return error?.response?.data || error?.message;
  }
};

export const updateEmailService = async (personalData: any) => {
  try {
    const response = await axiosInstance.put('api/users/me/update-email', personalData);
    return response?.data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data || error?.message;
  }
};

export const deleteUserService = async () => {
  try {
    const response = await axiosInstance.delete('api/users');
    return response?.data;
  } catch (error: any) {
    console.log(error);
    return error?.response?.data || error?.message;
  }
};

export const getBlogs = async (page = 0, size = 5, sort = 'createdAt') => {
  try {
    const response = await axiosInstance.get('api/blog/posts', {
      params: {
        page,
        size,
        sort,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsId = async (blogId: string) => {
  try {
    const response = await axiosInstance.get(`api/blog/posts/${blogId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = async () => {
  try {
    const orders = await axiosInstance.get('api/orders/me');
    return orders.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = async (id: number) => {
  try {
    const order = await axiosInstance.get(`api/orders/${id}`);
    return order;
  } catch (error) {
    console.log(error);
  }
};

export const postOrderService = async (orders: any) => {
  try {
    const response = await axiosInstance.post('api/orders', orders);
    console.log('postOrderService', response);
    return response.data;
  } catch (error: any) {
    return error?.response.data || error?.message;
  }
};

// export const postOrderListService = async (orders: any) => {
//    console.log('postOrderListService', orders);
//   try {
//     const response = await axiosInstance.post(
//       'api/order-lists',
//       orders
//     );
//     console.log('postOrderListService', response);
//     return response.data;
//   } catch (error: any) {
//     return error?.response.data || error?.message;
//   }
// };
