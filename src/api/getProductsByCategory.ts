import axios from 'axios';
import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/config/api';
import type { ProductsResponse } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;

export const getProductsByCategory = async (
  productCategoryId?: number | null
): Promise<ProductsResponse> => {
  const query = qs.stringify({
    populate: ['images', 'productCategory'],
    ...(productCategoryId && { filters: { productCategory: { id: { $eq: productCategoryId } } } }),
  });
  const response = await axios.get<ProductsResponse>(`${STRAPI_URL}?${query}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return response.data;
};
