import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroProducts from '@/components/HeroProducts';
import Menu from '@/components/Menu';
import Products from '@/components/Products';
import { AllProductsStore } from '@/stores/local/AllProductsStore';
import { AllProductsStoreProvider } from '@/stores/local/AllProductsStore/AllProductsStoreContext';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [store] = useState(() => {
    const s = new AllProductsStore();
    s.initializeFromUrl(searchParams);
    return s;
  });

  useEffect(() => {
    store.setUrlUpdater((params) => setSearchParams(params, { replace: true }));
    return () => store.resetUrlUpdater();
  }, [store, setSearchParams]);

  return (
    <AllProductsStoreProvider value={store}>
      <HeroProducts />
      <Menu />
      <Products />
    </AllProductsStoreProvider>
  );
}

export default HomePage;
