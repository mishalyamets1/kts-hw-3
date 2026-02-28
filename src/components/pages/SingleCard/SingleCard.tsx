import RemoveButton from 'components/RemoveButton';
import styles from './SingleCard.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'components/ui-kit/Loader';
import Text from 'components/ui-kit/Text';
import Button from 'components/ui-kit/Button';
import Card from 'components/ui-kit/Card';
import { observer} from 'mobx-react-lite';
import { singleProductStore } from 'stores/local';
import { useEffect } from 'react';

const SingleCard = observer(() => {
  const { documentId } = useParams<{ documentId?: string }>();
  const navigate = useNavigate();
 const categoryId = singleProductStore.product?.productCategory?.id;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (documentId) {
      singleProductStore.fetchProductById(documentId)
    }
    return () => {
      singleProductStore.destroy()
    }
  }, [documentId])

  useEffect(() => {
    if (categoryId) {
      singleProductStore.fetchRelatedProducts(categoryId)
    }
  }, [categoryId])

  if (!documentId) {
    return (
      <Text view="title" color="accent">
        Товар не найден
      </Text>
    );
  }

  if (singleProductStore.productLoading) {
    return  <div className={styles.loader}><Loader /></div>;
  }

  if (singleProductStore.productError) {
    return (
      <Text view="title" color="accent">
        Ошибка: {singleProductStore.productError}
      </Text>
    );
  }

  if (!singleProductStore.product) {
    return (
      <Text view="title" color="accent">
        Товар не найден
      </Text>
    );
  }

  const image = singleProductStore.product.images && singleProductStore.product.images.length > 0 ? singleProductStore.product.images[0].url : undefined;
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
              {singleProductStore.product.title}
            </Text>
            <Text view="p-20" color="secondary">
              {singleProductStore.product.description}
            </Text>
          </div>

          <div className={styles.purchase}>
            <Text view="title" color="primary">
              ${singleProductStore.product.price}
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
          {singleProductStore.relatedError ? (
            <div className={styles.loader}><Loader /></div>
          ) : (
            singleProductStore.relatedProducts?.map((prod) => {
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
});

export default SingleCard;
