import { useState } from 'react';
import Card from 'components/ui-kit/Card';
import Loader from 'components/ui-kit/Loader';
import type { Product } from 'api/productsTypes';
import { useGetAllProducts } from '../../hooks/useGetAllProducts';
import Button from 'components/ui-kit/Button';
import styles from 'components/Products/Products.module.scss';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
export type ProductProps = {
  products: Product[];
  loading: boolean;
};
const Products = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { products, total, loading } = useGetAllProducts(page, pageSize);
  const navigate = useNavigate();
  const totalPages = total ? Math.ceil(total / pageSize) : 1;

  return (
    <div className={styles.products}>
      {loading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map((product) => {
              const image = product.images?.[0]?.url;
              return (
                <Card
                  key={product.documentId}
                  image={image}
                  title={product.title}
                  captionSlot={product.productCategory?.title}
                  subtitle={product.description}
                  contentSlot={`$${product.price}`}
                  actionSlot={<Button>Add to Cart</Button>}
                  onClick={() => navigate(`/product/${product.documentId}`)}
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
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                className={clsx({ [styles.activePage]: i + 1 === page })}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <img
              src="/svg/arrow-right (1).svg"
              className={styles.arrowRight}
              width={35}
              height={35}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
