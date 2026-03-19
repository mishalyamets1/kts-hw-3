'use client'

import { use, useEffect } from 'react';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import RemoveButton from '@/components/RemoveButton';
import Button from '@/components/ui-kit/Button';
import Card from '@/components/ui-kit/Card';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './SingleCard.module.scss';
import { useRouter } from 'next/navigation';
import type { Product, ProductsResponse } from '@/api/productsTypes';

type Props = {
  product: Product;
  relatedPromise: Promise<ProductsResponse>;
};

const SingleCard = observer(({product, relatedPromise}: Props) => {
  const { t } = useI18n();
  const relatedProducts = use(relatedPromise).data;

  const router = useRouter();
  const cartItem = cartStore.cartItems.find(item => item.product.id === product.id);
  const cartQuantity = cartItem?.quantity ?? 0;

const handleBuyNow = async () => {
  if (!authStore.isAuthenticated) {
    router.push(`/auth?next=/product/${product.documentId}`);
    return;
  }
  await cartStore.addItem(product.id, 1);
  router.push('/cart')
}

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
          <Image className={styles.image} src={image} alt={t('single.imageAlt')} width={600} height={600} />
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
              {t('single.inCart')} {cartQuantity}
            </Text>
            </div>
            
            <div className={styles.buttons}>
              <Button className={styles.btnBuy} onClick={handleBuyNow}>{t('single.buyNow')}</Button>
              <Button
                className={styles.btnCart}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!authStore.isAuthenticated) {
                    router.push(`/auth?next=/product/${product.documentId}`);
                    return;
                  }
                  cartStore.addItem(prodId, 1);
                }}
              >
                {t('single.addToCart')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.related}>
        <Text view="title" color="primary">
          {t('single.related')}
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
                        if (!authStore.isAuthenticated) {
                          router.push(`/auth?next=/product/${documentId}`);
                          return;
                        }
                        cartStore.addItem(id, 1);
                      }}
                    >
                      {t('single.addToCart')}
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
