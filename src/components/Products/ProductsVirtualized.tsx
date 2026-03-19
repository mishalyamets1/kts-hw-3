'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui-kit/Card';
import Button from '@/components/ui-kit/Button';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/providers/I18nProvider';
import { Product } from '@/api/productsTypes';
import styles from './ProductsVirtualized.module.scss';
import productStyles from './Products.module.scss';

const PAGE_SIZE = 10;

interface ProductsVirtualizedProps {
  products: Product[];
}

export default function ProductsVirtualized({ products }: ProductsVirtualizedProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [products]);

  useEffect(() => {
    if (!sentinelRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, products.length));
        }
      },
      { rootMargin: '300px 0px' }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [products.length]);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      {visibleProducts.map((product) => {
        const { documentId, title, description, price, productCategory, id } = product;
        const image = product.images?.[0]?.url;
        const cartQty = cartStore.getItemQuantity(id);

        return (
          <div key={documentId} style={{ display: 'flex', width: '100%' }}>
            <Card
              className={productStyles.card}
              image={image}
              title={title}
              captionSlot={productCategory?.title}
              subtitle={description}
              contentSlot={
                <div className={productStyles.contentSlot}>
                  <Text view="p-18" color="primary" weight="bold">
                    {`$${price}`}
                  </Text>
                  {cartQty > 0 && (
                    <Text view="p-14" color="secondary">
                      {t('products.inCart')} {cartQty}
                    </Text>
                  )}
                </div>
              }
              imageAlt={title}
              actionSlot={
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!authStore.isAuthenticated) {
                      router.push('/auth?next=/');
                      return;
                    }
                    cartStore.addItem(id, 1);
                  }}
                >
                  {t('products.addToCart')}
                </Button>
              }
              onClick={() => router.push(`/product/${documentId}`)}
            />
          </div>
        );
      })}

      {visibleCount < products.length && <div ref={sentinelRef} style={{ height: 1, width: '100%' }} />}
    </div>
  );
}
