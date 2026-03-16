'use client';

import { useState, useEffect, useMemo } from 'react';
import debounce from 'debounce';
import Card from '@/components/ui-kit/Card';
import Button from '@/components/ui-kit/Button';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import { useRouter } from 'next/navigation';
import { Product } from '@/api/productsTypes';
import styles from './ProductsVirtualized.module.scss';
import productStyles from './Products.module.scss';

const ITEM_HEIGHT = 682;
const BUFFER_SIZE = 3;

interface ProductsVirtualizedProps {
  products: Product[];
}

export default function ProductsVirtualized({ products }: ProductsVirtualizedProps) {
  const router = useRouter();
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const debouncedScroll = debounce(() => {
      setScrollTop(window.scrollY);
    }, 50);

    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, []);

  const { visibleProducts, topPadding, bottomPadding } = useMemo(() => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    const containerOffset = 350;
    const adjustedScroll = Math.max(0, scrollTop - containerOffset);

    const startIndex = Math.floor(adjustedScroll / ITEM_HEIGHT);
    const visibleCount = Math.ceil(windowHeight / ITEM_HEIGHT);

    const from = Math.max(0, startIndex - BUFFER_SIZE);
    const to = Math.min(products.length, startIndex + visibleCount + BUFFER_SIZE);

    return {
      visibleProducts: products.slice(from, to),
      topPadding: from * ITEM_HEIGHT,
      bottomPadding: Math.max(0, (products.length - to) * ITEM_HEIGHT),
    };
  }, [scrollTop, products]);

  return (
    <div className={styles.container}>
      <div style={{ height: topPadding }} />

      {visibleProducts.map((product) => {
        const { documentId, title, description, price, productCategory, id } = product;
        const image = product.images?.[0]?.url;
        const cartQty = cartStore.getItemQuantity(id);

        return (
          <div key={documentId} style={{ height: ITEM_HEIGHT, display: 'flex', width: '100%' }}>
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
                    In the cart: {cartQty}
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
                Add to Cart
              </Button>
            }
            onClick={() => router.push(`/product/${documentId}`)}
            />
          </div>
        );
      })}

      <div style={{ height: bottomPadding }} />
    </div>
  );
}
