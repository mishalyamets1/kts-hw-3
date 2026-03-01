import { useEffect } from 'react';
import Card from 'components/ui-kit/Card';
import Loader from 'components/ui-kit/Loader';
import type { Product } from 'api/productsTypes';
import Button from 'components/ui-kit/Button';
import styles from 'components/Products/Products.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { allProductsStore } from 'stores/global/AllProductsStore';
import { cartStore } from 'stores/global/CartStore';
export type ProductProps = {
  products: Product[];
  loading: boolean;
};
const Products = observer(() => {
  const pageSize = 9;
  const navigate = useNavigate();

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
          <div className={styles.grid}>
            {allProductsStore.products.map((product) => {
              const { documentId, title, description, price, productCategory, id } = product;
              const image = product.images?.[0]?.url;
              return (
                <Card
                  key={documentId}
                  image={image}
                  title={title}
                  captionSlot={productCategory?.title}
                  subtitle={description}
                  contentSlot={`$${price}`}
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

          <div className={styles.pagination}>
            <img
              src="/svg/arrow-right.svg"
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
              src="/svg/arrow-right (1).svg"
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
