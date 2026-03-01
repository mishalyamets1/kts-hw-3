import axios from 'axios';
import type { CartItem } from 'api/productsTypes';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const CART_URL = `${STRAPI_BASE_URL}/api/cart`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export type CartResponse = {
  data: CartItem[];
};

export const getCart = async (): Promise<CartItem[]> => {
  const response = await axios.get<CartItem[]>(CART_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data;
};

export const addToCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await axios.post<CartResponse>(
    `${CART_URL}/add`,
    {
      product: productId,
      quantity,
    },
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );
  return response.data.data;
};
export const removeFromCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await axios.post<CartResponse>(
    `${CART_URL}/remove`,
    {
      product: productId,
      quantity,
    },
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );
  return response.data.data;
};
