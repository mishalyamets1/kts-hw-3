import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';
import type { ProductsResponse, Locale } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;

export const getProductsByCategory = async (
  productCategoryId?: number | null,
  locale: Locale = 'en'
): Promise<ProductsResponse> => {
  const query = qs.stringify({
    populate: ['images', 'productCategory'],
    locale,
    ...(productCategoryId && { filters: { productCategory: { id: { $eq: productCategoryId } } } }),
  });
  const response = await fetch(`${STRAPI_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    next: {revalidate: 60},
  });
  const data = await response.json();
  return data;
};
