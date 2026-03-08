import type { CartItem } from '@/api/productsTypes';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';

const CART_URL = `${STRAPI_BASE_URL}/api/cart`;

const authHeaders = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json',
};

export type CartResponse = {
  data: CartItem[];
};

export const getCart = async (): Promise<CartItem[]> => {
  const response = await fetch(CART_URL, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
     cache: 'no-store'
  });
  return response.json()
};

export const addToCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(
    `${CART_URL}/add`,
    {
      method: 'POST',
      headers: authHeaders,
      cache: 'no-store',
      body: JSON.stringify({ product: productId, quantity})
    })
  const data: CartResponse = await response.json()

  return data.data;
};
export const removeFromCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(
    `${CART_URL}/remove`,
    {
      method: 'POST',
      headers: authHeaders,
      cache: 'no-store',
      body: JSON.stringify({ product: productId, quantity})
    })
  const data: CartResponse = await response.json()
  return data.data;
};
