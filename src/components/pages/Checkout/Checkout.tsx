'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { observer } from 'mobx-react-lite';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import Input from '@/components/ui-kit/Input';
import { cartStore } from '@/stores/global/CartStore';
import { removeFromCart } from '@/api/cartApi';
import { authStore } from '@/stores/global/AuthStore/AuthStore';
import type { CartItem } from '@/api/productsTypes';
import styles from './Checkout.module.scss';

const Checkout = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    setIsMounted(true);
    if (!authStore.isAuthenticated) {
      router.push('/auth?next=/checkout');
    }
  }, [router]);

  if (!isMounted || !authStore.isAuthenticated) {
    return null;
  }

  const type = searchParams.get('type');
  const itemId = searchParams.get('itemId');

  let itemsToPay: CartItem[] = [];
  let totalPrice = 0;

  if (type === 'item' && itemId) {
    const found = cartStore.cartItems.find(
      (item) => item.product.id === Number(itemId)
    );
    if (found) {
      itemsToPay = [found];
      totalPrice = found.product.price * found.quantity;
    }
  } else {
    itemsToPay = cartStore.cartItems;
    totalPrice = cartStore.totalPrice;
  }

  if (itemsToPay.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyText}>
          <Text view="p-20" color="secondary">
            No items to checkout
          </Text>
        </div>
      </div>
    );
  }

  const isFormValid =
    fullName.trim() && address.trim() && cardNumber.trim() && expiry.trim() && cvv.trim();

  const handleConfirm = async () => {
    if (!isFormValid) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (type === 'item' && itemId) {
      const found = cartStore.cartItems.find(
        (item) => item.product.id === Number(itemId)
      );
      if (found) {
        await cartStore.removeItemFull(found.product.id);
      }
    } else {
      const snapshot = [...cartStore.cartItems];
      cartStore.clearCart();
      await Promise.all(
        snapshot.map((item) => removeFromCart(item.product.id, item.quantity).catch(() => {}))
      );
    }

    router.push('/checkout/success');
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <Text view="title" color="primary">
          Checkout
        </Text>
      </div>

      <div className={styles.content}>
        <div className={styles.orderSummary}>
          <Text view="subtitle" color="primary">
            Your order
          </Text>
          <div className={styles.items}>
            {itemsToPay.map((item) => {
              const { id, title, price, images } = item.product;
              const imageUrl = images?.[0]?.url;
              return (
                <div className={styles.item} key={id}>
                  {imageUrl && (
                    <Image
                      className={styles.itemImg}
                      src={imageUrl}
                      alt={title}
                      width={80}
                      height={80}
                    />
                  )}
                  <div className={styles.itemInfo}>
                    <Text color="primary" weight="bold">
                      {title}
                    </Text>
                    <Text color="secondary" view="p-14">
                      Quantity: {item.quantity}
                    </Text>
                  </div>
                  <Text color="primary" weight="bold" className={styles.itemPrice}>
                    ${price * item.quantity}
                  </Text>
                </div>
              );
            })}
          </div>
          <div className={styles.totalRow}>
            <Text view="p-20" weight="bold" color="primary">
              Total:
            </Text>
            <Text view="p-20" weight="bold" color="accent">
              ${totalPrice.toFixed(2)}
            </Text>
          </div>
        </div>

        <div className={styles.form}>
          <Text view="subtitle" color="primary">
            Payment details
          </Text>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">Full name</Text>
            <Input value={fullName} onChange={setFullName} placeholder="Ivan Ivanov" />
          </div>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">Shipping address</Text>
            <Input value={address} onChange={setAddress} placeholder="123 Primernaya ul, Moscow" />
          </div>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">Card number</Text>
            <Input value={cardNumber} onChange={setCardNumber} placeholder="1234 5678 9012 3456" />
          </div>
          <div className={styles.cardRow}>
            <div className={styles.field}>
              <Text view="p-14" color="secondary">Expiry</Text>
              <Input value={expiry} onChange={setExpiry} placeholder="MM/YY" />
            </div>
            <div className={styles.field}>
              <Text view="p-14" color="secondary">CVV</Text>
              <Input value={cvv} onChange={setCvv} placeholder="123" />
            </div>
          </div>
          <Button
            className={styles.confirmBtn}
            disabled={!isFormValid || loading}
            onClick={handleConfirm}
          >
            {loading ? 'Processing...' : `Pay $${totalPrice}`}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Checkout;
