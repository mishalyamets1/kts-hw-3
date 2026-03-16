import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';
import { PRODUCTS_PAGE_SIZE } from '@/configs/constants';
import type { ProductsResponse, Locale } from './productsTypes';

const STRAPI_URL = `${STRAPI_BASE_URL}/api/products`;

type GetProductsParams = {
  page?: number;
  pageSize?: number;
  searchTitle?: string;
  categoryIds?: number[];
  locale?: Locale;
};

export const getProducts = async ({
  page = 1,
  pageSize = PRODUCTS_PAGE_SIZE,
  searchTitle,
  categoryIds,
  locale = 'en',
}: GetProductsParams): Promise<ProductsResponse> => {
  const filters: Record<string, unknown> = {};

  if (searchTitle && searchTitle.trim()) {
    filters.title = { $containsi: searchTitle };
  }

  if (categoryIds && categoryIds.length > 0) {
    filters.productCategory = { id: { $in: categoryIds } };
  }

  const query = qs.stringify(
    {
      populate: ['images', 'productCategory'],
      pagination: { page, pageSize },
      locale,
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { arrayFormat: 'brackets' }
  );
  const response = await fetch(`${STRAPI_URL}?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
    next: {revalidate: 60},
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
