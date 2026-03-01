import { getProducts } from '../api/getProducts';
import type { Product } from '../api/productsTypes';
import { useEffect, useState } from 'react';

export const useGetAllProducts = (page = 1, pageSize = 9) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProducts(page, pageSize)
      .then((data) => {
        setProducts(data.data);
        setTotal(data.meta?.pagination?.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);
  return { products, total, loading };
};
