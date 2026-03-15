'use client';
import { useEffect, useState } from 'react';
import HeroProducts from '@/components/HeroProducts';
import Menu from '@/components/Menu';
import Products from '@/components/Products';
import { AllProductsStore } from './store';
import { AllProductsStoreProvider } from './StoreContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductCategory } from '@/api/productsTypes';

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  initialCategories: ProductCategory[]
}

function HomePage({initialProducts, initialTotal, initialCategories}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter()

  const [store] = useState(() => {
    const s = new AllProductsStore();
    s.initializeFromUrl(searchParams);
    s.setInitialData(initialProducts, initialTotal, initialCategories)
    return s;
  });

  useEffect(() => {
    store.setUrlUpdater((params) => {
      const query = params.toString();
      router.replace(query ? `/?${query}` : '/')
    });
    return () => store.resetUrlUpdater();
  }, [store, router]);

  return (
    <AllProductsStoreProvider value={store}>
      <HeroProducts />
      <Menu />
      <Products />
    </AllProductsStoreProvider>
  );
}

export default HomePage;
