import type { CartItem } from '@/api/productsTypes';
import { authStore } from '@/stores/global/AuthStore/AuthStore';

const CART_URL = '/api/cart';

export type CartResponse = {
  data: CartItem[];
};

const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (authStore.token) {
    headers['Authorization'] = `Bearer ${authStore.token}`;
  }
  return headers;
};

export const getCart = async (): Promise<CartItem[]> => {
  const response = await fetch(CART_URL, {
    cache: 'no-store',
    headers: getAuthHeaders(),
  });
  return response.json();
};

export const addToCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(`${CART_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const data: CartResponse = await response.json();
  return data.data;
};

export const removeFromCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(`${CART_URL}/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const data: CartResponse = await response.json();
  return data.data;
};
