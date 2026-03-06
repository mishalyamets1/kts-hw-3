import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from '@/components/Header';
import About from '@/components/pages/About/About';
import Cart from '@/components/pages/Cart';
import Categories from '@/components/pages/Categories/Categories';
import HomePage from '@/components/pages/HomePage/HomePage';
import SingleCard from '@/components/pages/SingleCard';
import Toast from '@/components/Toast';
import { cartStore } from '@/stores/global/CartStore';

function App() {
  useEffect(() => {
    cartStore.fetchCart();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
