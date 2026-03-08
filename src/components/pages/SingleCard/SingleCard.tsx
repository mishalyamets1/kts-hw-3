'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import RemoveButton from '@/components/RemoveButton';
import Button from '@/components/ui-kit/Button';
import Card from '@/components/ui-kit/Card';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import styles from './SingleCard.module.scss';
import { useRouter } from 'next/navigation';
import type { Product } from '@/api/productsTypes';

type Props = {
  product: Product;
  relatedProducts: Product[];
};

const SingleCard = observer(({product, relatedProducts}: Props) => {
  
  const router = useRouter();
  const cartItem = cartStore.cartItems.find(item => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const image =
    product.images && product.images.length > 0
      ? product.images[0].url
      : undefined;
  const { id: prodId, title, description, price } = product;
  return (
    <div className={styles.singleCard}>
      <RemoveButton />
      <div className={styles.container}>
        {image && (
          <Image className={styles.image} src={image} alt="фото товара" width={600} height={600} />
        )}
        <div className={styles.info}>
          <div className={styles.text}>
            <Text view="title" color="primary">
              {title}
            </Text>
            <Text view="p-20" color="secondary">
              {description}
            </Text>
          </div>

          <div className={styles.purchase}>
            <div className={styles.purchaseInfo}>
              <Text view="title" color="primary">
              ${price}
            </Text>
            <Text color='secondary' view='p-20'>
              In the cart: {cartQuantity}
            </Text>
            </div>
            
            <div className={styles.buttons}>
              <Button className={styles.btnBuy}>Buy now</Button>
              <Button
                className={styles.btnCart}
                onClick={(e) => {
                  e.stopPropagation();
                  cartStore.addItem(prodId, 1);
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.related}>
        <Text view="title" color="primary">
          Related Items
        </Text>
        <div className={styles.cards}>
          {relatedProducts?.map((prod) => {
              const { id, documentId, title, description, price, productCategory } = prod;
              const image = prod.images?.[0]?.url;
              return (
                <Card
                  key={documentId}
                  image={image}
                  captionSlot={productCategory?.title}
                  title={title}
                  imageAlt={title}
                  subtitle={description}
                  contentSlot={<Text view="p-18" color="primary" weight="bold">{`$${price}`}</Text>}
                  actionSlot={
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        cartStore.addItem(id, 1);
                      }}
                    >
                      Add to cart
                    </Button>
                  }
                  onClick={() => router.push(`/product/${documentId}`)}
                />
              );
            })
          }
        </div>
      </div>
    </div>
  );
});

export default SingleCard;
