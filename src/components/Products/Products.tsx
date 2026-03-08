'use client'

import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import Button from '@/components/ui-kit/Button';
import Card from '@/components/ui-kit/Card';
import Loader from '@/components/ui-kit/Loader';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { useAllProductsStore } from '@/components/pages/HomePage/StoreContext';
import styles from './Products.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Products = observer(() => {
  const pageSize = 9;
  const router = useRouter();
  const allProductsStore = useAllProductsStore();

  const totalPages = allProductsStore.total ? Math.ceil(allProductsStore.total / pageSize) : 1;

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
                Nothing was found
              </Text>
              <Text view="p-18" color="secondary">
                Try changing the query or resetting the filters
              </Text>
            </div>
          ) : (
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
                          cartStore.addItem(id, 1);
                        }}
                      >
                        Add to Cart
                      </Button>
                    }
                    onClick={() => router.push(`/product/${documentId}`)}
                  />
                );
              })}
            </div>
          )}

          <div className={styles.pagination}>
            <Image
              src="/svg/arrow-left.svg"
              className={styles.arrowLeft}
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
              className={styles.arrowRight}
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
    </div>
  );
});

export default Products;
