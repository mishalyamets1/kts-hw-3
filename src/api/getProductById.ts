import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';
import type { Product } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;

export const getProductById = async (documentId: string): Promise<Product> => {
  const query = qs.stringify({ populate: ['images', 'productCategory'] });
  const response = await fetch(`${STRAPI_URL}/${documentId}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    next: {revalidate: 60},
  });
  const data = await response.json();
  return data.data;
};
