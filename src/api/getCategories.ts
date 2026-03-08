import axios from 'axios';
import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/config/api';
import type { ProductCategory } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/product-categories`;

type CategoriesResponse = {
  data: ProductCategory[];
};

export const getCategories = async (): Promise<ProductCategory[]> => {
  const query = qs.stringify({});
  const response = await axios.get<CategoriesResponse>(`${STRAPI_URL}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data.data;
};
