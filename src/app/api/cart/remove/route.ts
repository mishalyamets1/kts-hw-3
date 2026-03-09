import { NextRequest, NextResponse } from 'next/server';
import { STRAPI_BASE_URL, API_TOKEN } from '@/configs/api';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const response = await fetch(`${STRAPI_BASE_URL}/api/cart/remove`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
