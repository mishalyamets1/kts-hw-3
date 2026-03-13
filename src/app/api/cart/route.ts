import { NextRequest, NextResponse } from 'next/server';
import { STRAPI_BASE_URL } from '@/configs/api';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(`${STRAPI_BASE_URL}/api/cart`, {
    headers: {
      Authorization: authHeader,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
