import { getProductById } from '../api/getProductById';
import type { Product } from '../api/productsTypes';
import { useEffect, useState } from 'react';

export const useGetProductById = (documentId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductById(documentId)
      .then((data) => {
        setProduct(data);
        setError(null);
      })
      .catch((err) => {
        setProduct(null);
        setError(err.message || 'Ошибка при загрузке товара');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [documentId]);
  return { product, loading, error };
};
