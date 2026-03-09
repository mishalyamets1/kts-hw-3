import { NextResponse } from 'next/server';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';

export async function GET() {
  const response = await fetch(`${STRAPI_BASE_URL}/api/cart`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
