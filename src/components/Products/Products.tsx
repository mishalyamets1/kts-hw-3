'use client'

import clsx from 'clsx';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Button from '@/components/ui-kit/Button';
import Card from '@/components/ui-kit/Card';
import Loader from '@/components/ui-kit/Loader';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import { useAllProductsStore } from '@/components/pages/HomePage/StoreContext';
import { useI18n } from '@/components/providers/I18nProvider';
import { PRODUCTS_PAGE_SIZE } from '@/configs/constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import ProductsVirtualized from './ProductsVirtualized';
import ScrollToTopButton from './ScrollToTopButton';
import styles from './Products.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Products = observer(() => {
  const { t } = useI18n();
  const pageSize = PRODUCTS_PAGE_SIZE;
  const router = useRouter();
  const allProductsStore = useAllProductsStore();
  const isMobile = useIsMobile();

  const totalPages = allProductsStore.total ? Math.ceil(allProductsStore.total / pageSize) : 1;

  useEffect(() => {
    if (isMobile) {
      allProductsStore.fetchAllProducts();
    }
  }, [isMobile, allProductsStore]);

  return (
    <div className={styles.products}>
      {allProductsStore.productsLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          {allProductsStore.products.length === 0 ? (
            <div className={styles.empty}>
              <Text view="title" color="secondary">
                {t('products.empty.title')}
              </Text>
              <Text view="p-18" color="secondary">
                {t('products.empty.subtitle')}
              </Text>
            </div>
          ) : isMobile ? (
            <ProductsVirtualized products={allProductsStore.products} />
          ) : (
            <>
              <div className={styles.grid}>
                {allProductsStore.products.map((product) => {
                  const { documentId, title, description, price, productCategory, id } = product;
                  const image = product.images?.[0]?.url;
                  const cartQty = cartStore.getItemQuantity(id);
                  return (
                    <Card
                      key={documentId}
                      image={image}
                      title={title}
                      captionSlot={productCategory?.title}
                      subtitle={description}
                      contentSlot={
                        <div className={styles.contentSlot}>
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
                  );
                })}
              </div>

              <div className={styles.pagination}>
                <Image
                  src="/svg/arrow-left.svg"
                  className={clsx(styles.arrowLeft, styles.arrowIcon)}
                  width={35}
                  alt='arrow-left'
                  height={35}
                  onClick={() =>
                    allProductsStore.setCurrentPage(Math.max(1, allProductsStore.currentPage - 1))
                  }
                />
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    className={clsx({ [styles.activePage]: i + 1 === allProductsStore.currentPage })}
                    onClick={() => allProductsStore.setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Image
                  src="/svg/arrow-right.svg"
                  className={clsx(styles.arrowRight, styles.arrowIcon)}
                  alt='arrow-right'
                  width={35}
                  height={35}
                  onClick={() =>
                    allProductsStore.setCurrentPage(
                      Math.min(totalPages, allProductsStore.currentPage + 1)
                    )
                  }
                />
              </div>
            </>
          )}
        </>
      )}
      <ScrollToTopButton />
    </div>
  );
});

export default Products;
