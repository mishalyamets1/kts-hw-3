import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from '@/components/Header';
import HeroProducts from '@/components/HeroProducts';
import Menu from '@/components/Menu';
import About from '@/components/pages/About/About';
import Cart from '@/components/pages/Cart';
import Categories from '@/components/pages/Categories/Categories';
import SingleCard from '@/components/pages/SingleCard';
import Products from '@/components/Products';
import Toast from '@/components/Toast';
import { cartStore } from '@/stores/global/CartStore';
import { AllProductsStore } from '@/stores/local/AllProductsStore';
import { AllProductsStoreProvider } from '@/stores/local/AllProductsStore/AllProductsStoreContext';

function App() {
  const [allProductsStore] = useState(() => new AllProductsStore());

  useEffect(() => {
    allProductsStore.initializeFromUrl();
  }, [allProductsStore]);
  useEffect(() => {
    cartStore.fetchCart();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AllProductsStoreProvider value={allProductsStore}>
              <HeroProducts />
              <Menu />
              <Products />
            </AllProductsStoreProvider>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:documentId" element={<SingleCard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
