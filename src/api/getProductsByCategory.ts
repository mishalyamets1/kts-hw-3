import axios from 'axios';
import qs from 'qs';
import type { ProductsResponse } from './productsTypes';

const STRAPI_BASE_URL = import.meta.env.VITE_STRAPI_BASE_URL;
const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;
export const getProductsByCategory = async (
  productCategoryId?: number | null
): Promise<ProductsResponse> => {
  const query = qs.stringify({
    populate: ['images', 'productCategory'],
    ...(productCategoryId && { filters: { productCategory: { id: { $eq: productCategoryId } } } }),
  });
  const response = await axios.get<ProductsResponse>(`${STRAPI_URL}?${query}`, {
    headers: {
      Authorization: API_TOKEN,
    },
  });
  return response.data;
};
