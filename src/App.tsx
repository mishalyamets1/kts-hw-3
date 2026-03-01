import Products from 'components/Products';
import './App.scss';
import Header from 'components/Header';
import HeroProducts from 'components/HeroProducts';
import Menu from 'components/Menu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingleCard from 'components/pages/SingleCard';
import Categories from 'components/pages/Categories/Categories';
import About from 'components/pages/About/About';
import { useEffect } from 'react';
import { allProductsStore } from 'stores/global/AllProductsStore';
import { cartStore } from 'stores/global/CartStore';
import Cart from 'components/pages/Cart';

function App() {
  useEffect(() => {
    allProductsStore.initializeFromUrl();
  }, []);
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
            <>
              <HeroProducts />
              <Menu />
              <Products />
            </>
          }
        />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:documentId" element={<SingleCard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
