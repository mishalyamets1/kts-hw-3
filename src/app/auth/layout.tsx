import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Login or register to continue shopping',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
