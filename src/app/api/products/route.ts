import { NextRequest, NextResponse } from 'next/server';
import qs from 'qs';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '9');
  const searchTitle = searchParams.get('search') || '';
  const categoriesParam = searchParams.get('categories');
  const categoryIds = categoriesParam ? categoriesParam.split(',').map(Number) : [];

  const filters: Record<string, unknown> = {};

  if (searchTitle.trim()) {
    filters.title = { $containsi: searchTitle };
  }

  if (categoryIds.length > 0) {
    filters.productCategory = { id: { $in: categoryIds } };
  }

  const query = qs.stringify(
    {
      populate: ['images', 'productCategory'],
      pagination: { page, pageSize },
      ...(Object.keys(filters).length > 0 && { filters }),
    },
    { arrayFormat: 'brackets' }
  );

  const response = await fetch(`${STRAPI_BASE_URL}/api/products?${query}`, {
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
