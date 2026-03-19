import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Success',
  description: 'Your order has been placed successfully',
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
