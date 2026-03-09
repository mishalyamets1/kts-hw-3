import type { CartItem } from '@/api/productsTypes';

const CART_URL = '/api/cart';

export type CartResponse = {
  data: CartItem[];
};

export const getCart = async (): Promise<CartItem[]> => {
  const response = await fetch(CART_URL, {
    cache: 'no-store',
  });
  return response.json();
};

export const addToCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(`${CART_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const data: CartResponse = await response.json();
  return data.data;
};

export const removeFromCart = async (productId: number, quantity = 1): Promise<CartItem[]> => {
  const response = await fetch(`${CART_URL}/remove`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId, quantity }),
  });
  const data: CartResponse = await response.json();
  return data.data;
};
