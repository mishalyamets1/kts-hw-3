import { getProductsByCategory } from '../api/getProductsByCategory';
import type { Product } from '../api/productsTypes';
import { useEffect, useState } from 'react';

export const useGetProductByCategory = (productCategoryId?: number | null) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productCategoryId) return;

    setLoading(true);
    getProductsByCategory(productCategoryId)
      .then((data) => {
        setRelatedProducts(data.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || 'Ошибка при загрузке товаров');
      })
      .finally(() => setLoading(false));
  }, [productCategoryId]);

  return { relatedProducts, loading, error };
};
