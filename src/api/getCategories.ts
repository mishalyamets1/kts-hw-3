import axios from 'axios';
import qs from 'qs';
import type { ProductCategory } from './productsTypes';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_URL = `${STRAPI_BASE_URL}/api/product-categories`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

type CategoriesResponse = {
  data: ProductCategory[];
};

export const getCategories = async (): Promise<ProductCategory[]> => {
  const query = qs.stringify({});
  const response = await axios.get<CategoriesResponse>(`${STRAPI_URL}?${query}`, {
    headers: { Authorization: API_TOKEN },
  });
  return response.data.data;
};
