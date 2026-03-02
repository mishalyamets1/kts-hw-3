import axios from 'axios';
import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/config/api';
import type { Product } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;
type ProductByIdResponse = {
  data: Product;
};
export const getProductById = async (documentId: string): Promise<Product> => {
  const query = qs.stringify({ populate: ['images', 'productCategory'] });
  const response = await axios.get<ProductByIdResponse>(`${STRAPI_URL}/${documentId}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });
  return response.data.data;
};
