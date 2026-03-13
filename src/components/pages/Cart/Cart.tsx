'use client'

import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui-kit/Button';
import Loader from '@/components/ui-kit/Loader';
import Text from '@/components/ui-kit/Text';
import { cartStore } from '@/stores/global/CartStore';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import styles from './Cart.module.scss';

const Cart = observer(() => {
  const router = useRouter();

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.push('/auth?next=/cart');
    }
  }, [router]);

  if (!authStore.isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.cartTitle}>
        <Text view="title" color='primary'>Cart</Text>
      </div>
      <div className={styles.cartInfo}>
        <Text view="subtitle" color='primary'>Products in the cart:</Text>
        <Text view="p-20" weight="bold" color="accent">
          {cartStore.itemsCount}
        </Text>
      </div>
      {cartStore.cartLoading ? (
        <div className={styles.loader}>
          <Loader size="l" />
        </div>
      ) : (
        <div className={styles.cartItems}>
          {Array.isArray(cartStore.cartItems) && cartStore.cartItems.length > 0 ? (
            cartStore.cartItems.map((item) => {
              const { id: itemId, quantity } = item;
              const { id: productId, title, price, images } = item.product;
              const imageUrl = images?.[0]?.url;
              const isUpdating = cartStore.isItemUpdating(productId);
              return (
                <div
                  className={`${styles.cartItem} ${isUpdating ? styles.cartItemUpdating : ''}`}
                  key={itemId}
                >
                  <div>
                    <Image className={styles.img} src={imageUrl} alt={title} width={100} height={100} />
                  </div>
                  <div className={styles.itemInfo}>
                    <Text color="primary" weight="bold">
                      {title}
                    </Text>
                    <Text color="primary">${price * quantity}</Text>
                    <div className={styles.quantity}>
                      <Button
                        className={styles.quantityBtn}
                        disabled={isUpdating}
                        onClick={() => cartStore.removeItem(productId)}
                      >
                        -
                      </Button>
                      <Text color='primary'>{quantity}</Text>
                      <Button
                        className={styles.quantityBtn}
                        disabled={isUpdating}
                        onClick={() => cartStore.addItem(productId)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className={styles.btnBox}>
                    <Button
                      className={styles.removeBtn}
                      disabled={isUpdating}
                      onClick={() => cartStore.removeItemFull(productId)}
                    >
                      Remove
                    </Button>
                    <Button className={styles.buyBtn}>Buy</Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>
      )}
    </div>
  );
});

export default Cart;
