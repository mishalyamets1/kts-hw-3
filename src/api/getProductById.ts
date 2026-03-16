import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';
import type { Product, Locale } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;

export const getProductById = async (documentId: string, locale: Locale = 'en'): Promise<Product> => {
  const query = qs.stringify({ populate: ['images', 'productCategory'], locale });
  const response = await fetch(`${STRAPI_URL}/${documentId}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    next: {revalidate: 60},
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch product ${documentId}: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
};
