import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';
import type { ProductCategory } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/product-categories`;

export const getCategories = async (): Promise<ProductCategory[]> => {
  const query = qs.stringify({});
  const response = await fetch(`${STRAPI_URL}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    next: {revalidate: 60},
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
};
