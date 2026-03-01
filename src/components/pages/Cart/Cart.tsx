import Text from 'components/ui-kit/Text';
import Loader from 'components/ui-kit/Loader';

import { cartStore } from 'stores/global/CartStore';
import { observer } from 'mobx-react-lite';
import styles from './Cart.module.scss';
import Button from 'components/ui-kit/Button';
const Cart = observer(() => {
  return (
    <div className={styles.cart}>
      <div className={styles.cartTitle}>
        <Text view="title">Cart</Text>
      </div>
      <div className={styles.cartInfo}>
        <Text view="subtitle">Products in the cart:</Text>
        <Text view="p-20" weight="bold" color="accent">
          {cartStore.ItemsCount}
        </Text>
      </div>
      {cartStore.cartLoading ? (
        <div className={styles.loader}>
          <Loader size="l" />
        </div>
      ) : (
        <div className={styles.cartItems}>
          {Array.isArray(cartStore.cartItems) && cartStore.cartItems.length > 0 ? (
            cartStore.cartItems.map((item) => (
              <div className={styles.cartItem} key={item.id}>
                <div>
                  <img className={styles.img} src={item.product.images?.[0]?.url} alt="" />
                </div>
                <div className={styles.itemInfo}>
                  <Text color="primary" weight="bold">
                    {item.product.title}
                  </Text>
                  <Text>${item.product.price * item.quantity}</Text>
                  <div className={styles.quantity}>
                    <Button
                      className={styles.quantityBtn}
                      onClick={() => cartStore.removeItem(item.product.id)}
                    >
                      -
                    </Button>
                    <Text>{item.quantity}</Text>
                    <Button
                      className={styles.quantityBtn}
                      onClick={() => cartStore.addItem(item.product.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className={styles.btnBox}>
                  <Button
                    className={styles.removeBtn}
                    onClick={() => cartStore.removeItemFull(item.product.id)}
                  >
                    Remove
                  </Button>
                  <Button className={styles.buyBtn}>Buy</Button>
                </div>
              </div>
            ))
          ) : (
            <p>Корзина пуста</p>
          )}
        </div>
      )}
    </div>
  );
});

export default Cart;
