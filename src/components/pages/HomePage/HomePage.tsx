'use client';
import { useEffect, useState } from 'react';
import HeroProducts from '@/components/HeroProducts';
import Menu from '@/components/Menu';
import Products from '@/components/Products';
import { AllProductsStore } from './store';
import { AllProductsStoreProvider } from './StoreContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product, ProductCategory } from '@/api/productsTypes';
import Snowfall from 'react-snowfall';

type Props = {
  initialProducts: Product[];
  initialTotal: number;
  initialCategories: ProductCategory[]
}

function HomePage({initialProducts, initialTotal, initialCategories}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [image, setImage] = useState<HTMLImageElement[]>([]);
  const [store] = useState(() => {
    const s = new AllProductsStore();
    s.initializeFromUrl(searchParams);
    s.setInitialData(initialProducts, initialTotal, initialCategories)
    return s;
  });

  useEffect(() => {
    if (store.priceMin !== null || store.priceMax !== null || store.sortOrder !== 'none') return;
    store.setInitialData(initialProducts, initialTotal, initialCategories);
  }, [store, initialProducts, initialTotal, initialCategories]);

  useEffect(() => {
    const snowCat = document.createElement('img');
    snowCat.src = '/svg/cat-kts.svg';
    setImage([snowCat]);
  }, []);

  useEffect(() => {
    store.setUrlUpdater((params) => {
      const query = params.toString();
      router.replace(query ? `/?${query}` : '/', { scroll: false })
    });
    return () => store.resetUrlUpdater();
  }, [store, router]);

  return (
    <AllProductsStoreProvider value={store}>
      <Snowfall images={image} radius={[15, 30]} snowflakeCount={30} speed={[1, 1]}/> 
      <HeroProducts />
      <Menu />
      <Products />
    </AllProductsStoreProvider>
  );
}

export default HomePage;
