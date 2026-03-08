import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/api/productsTypes';
import Button from '@/components/ui-kit/Button';
import Card from '@/components/ui-kit/Card';
import Loader from '@/components/ui-kit/Loader';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { useAllProductsStore } from '@/stores/local/AllProductsStore/AllProductsStoreContext';
import styles from './Products.module.scss';

export type ProductProps = {
  products: Product[];
  loading: boolean;
};
const Products = observer(() => {
  const pageSize = 9;
  const navigate = useNavigate();
  const allProductsStore = useAllProductsStore();

  useEffect(() => {
    allProductsStore.fetchProducts(pageSize);
  }, [
    allProductsStore.currentPage,
    allProductsStore.searchTitle,
    allProductsStore.selectedCategoryIds,
  ]);

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
                    onClick={() => navigate(`/product/${documentId}`)}
                  />
                );
              })}
            </div>
          )}

          <div className={styles.pagination}>
            <img
              src="/svg/arrow-left.svg"
              className={styles.arrowLeft}
              width={35}
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
            <img
              src="/svg/arrow-right.svg"
              className={styles.arrowRight}
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
