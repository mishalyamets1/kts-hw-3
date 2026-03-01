import RemoveButton from 'components/RemoveButton';
import styles from './SingleCard.module.scss';
import { useGetProductById } from '../../../hooks/useGetProductById';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/ui-kit/Loader';
import Text from 'components/ui-kit/Text';
import Button from 'components/ui-kit/Button';
import { useGetProductByCategory } from '../../../hooks/useGetProductByCategory';
import Card from 'components/ui-kit/Card';
import { useEffect } from 'react';

const SingleCard = () => {
  const { documentId } = useParams<{ documentId?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [documentId]);

  const { product, loading, error } = useGetProductById(documentId ?? '');
  const { relatedProducts, loading: relLoading } = useGetProductByCategory(
    product?.productCategory?.id ?? undefined
  );

  if (!documentId) {
    return (
      <Text view="title" color="accent">
        Товар не найден
      </Text>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Text view="title" color="accent">
        Ошибка: {error}
      </Text>
    );
  }

  if (!product) {
    return (
      <Text view="title" color="accent">
        Товар не найден
      </Text>
    );
  }

  const image = product.images && product.images.length > 0 ? product.images[0].url : undefined;
  return (
    <div className={styles.singleCard}>
      <RemoveButton />
      <div className={styles.container}>
        {image && (
          <img className={styles.image} src={image} alt="фото товара" width={600} height={600} />
        )}
        <div className={styles.info}>
          <div className={styles.text}>
            <Text view="title" color="primary">
              {product.title}
            </Text>
            <Text view="p-20" color="secondary">
              {product.description}
            </Text>
          </div>

          <div className={styles.purchase}>
            <Text view="title" color="primary">
              ${product.price}
            </Text>
            <div className={styles.buttons}>
              <Button className={styles.btnBuy}>Buy now</Button>
              <Button className={styles.btnCart}>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.related}>
        <Text view="title" color="primary">
          Related Items
        </Text>
        <div className={styles.cards}>
          {relLoading ? (
            <Loader />
          ) : (
            relatedProducts?.map((prod) => {
              const image = prod.images?.[0]?.url ?? '';
              return (
                <Card
                  key={prod.documentId}
                  image={image}
                  captionSlot={prod.productCategory?.title}
                  title={prod.title}
                  subtitle={prod.description}
                  contentSlot={`$${prod.price}`}
                  actionSlot={<Button>Buy now</Button>}
                  onClick={() => navigate(`/product/${prod.documentId}`)}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
