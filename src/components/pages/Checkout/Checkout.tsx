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
import { useI18n } from '@/components/providers/I18nProvider';
import type { CartItem } from '@/api/productsTypes';
import styles from './Checkout.module.scss';

const Checkout = observer(() => {
  const { t, locale } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [touched, setTouched] = useState({
    fullName: false,
    address: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
  });

  const messages = locale === 'ru'
    ? {
        required: 'Поле обязательно',
        fullName: 'Введите имя и фамилию',
        address: 'Укажите корректный адрес (минимум 8 символов)',
        cardNumber: 'Номер карты должен содержать 16 цифр',
        expiry: 'Введите срок в формате MM/YY',
        expired: 'Срок действия карты истек',
        cvv: 'CVV должен содержать 3 цифры',
      }
    : {
        required: 'This field is required',
        fullName: 'Enter first and last name',
        address: 'Enter a valid address (at least 8 characters)',
        cardNumber: 'Card number must contain 16 digits',
        expiry: 'Enter expiry in MM/YY format',
        expired: 'Card has expired',
        cvv: 'CVV must contain 3 digits',
      };

  const sanitizeCardNumber = (value: string) => value.replace(/\D/g, '').slice(0, 16);

  const sanitizeExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const sanitizeCvv = (value: string) => value.replace(/\D/g, '').slice(0, 3);

  const getFullNameError = (value: string) => {
    const v = value.trim();
    if (!v) return messages.required;
    const parts = v.split(/\s+/).filter(Boolean);
    if (parts.length < 2) return messages.fullName;
    return '';
  };

  const getAddressError = (value: string) => {
    const v = value.trim();
    if (!v) return messages.required;
    if (v.length < 8) return messages.address;
    return '';
  };

  const getCardNumberError = (value: string) => {
    if (!value) return messages.required;
    if (!/^\d{16}$/.test(value)) return messages.cardNumber;
    return '';
  };

  const getExpiryError = (value: string) => {
    if (!value) return messages.required;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return messages.expiry;

    const [monthRaw, yearRaw] = value.split('/');
    const month = Number(monthRaw);
    const year = 2000 + Number(yearRaw);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return messages.expired;
    }

    return '';
  };

  const getCvvError = (value: string) => {
    if (!value) return messages.required;
    if (!/^\d{3}$/.test(value)) return messages.cvv;
    return '';
  };

  const validationErrors = {
    fullName: getFullNameError(fullName),
    address: getAddressError(address),
    cardNumber: getCardNumberError(cardNumber),
    expiry: getExpiryError(expiry),
    cvv: getCvvError(cvv),
  };

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
            {t('checkout.noItems')}
          </Text>
        </div>
      </div>
    );
  }

  const isFormValid = Object.values(validationErrors).every((error) => !error);

  const handleConfirm = async () => {
    setSubmitted(true);
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
          {t('checkout.title')}
        </Text>
      </div>

      <div className={styles.content}>
        <div className={styles.orderSummary}>
          <Text view="subtitle" color="primary">
            {t('checkout.yourOrder')}
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
                      {t('checkout.quantity')} {item.quantity}
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
              {t('checkout.total')}
            </Text>
            <Text view="p-20" weight="bold" color="accent">
              ${totalPrice.toFixed(2)}
            </Text>
          </div>
        </div>

        <div className={styles.form}>
          <Text view="subtitle" color="primary">
            {t('checkout.paymentDetails')}
          </Text>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">{t('checkout.fullName')}</Text>
            <Input
              value={fullName}
              onChange={setFullName}
              onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
              placeholder={t('checkout.fullNamePlaceholder')}
            />
            {(touched.fullName || submitted) && validationErrors.fullName && (
              <Text view="p-14" color="accent" className={styles.fieldError}>
                {validationErrors.fullName}
              </Text>
            )}
          </div>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">{t('checkout.shippingAddress')}</Text>
            <Input
              value={address}
              onChange={setAddress}
              onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
              placeholder={t('checkout.shippingAddressPlaceholder')}
            />
            {(touched.address || submitted) && validationErrors.address && (
              <Text view="p-14" color="accent" className={styles.fieldError}>
                {validationErrors.address}
              </Text>
            )}
          </div>
          <div className={styles.field}>
            <Text view="p-14" color="secondary">{t('checkout.cardNumber')}</Text>
            <Input
              value={cardNumber}
              onChange={(value) => setCardNumber(sanitizeCardNumber(value))}
              onBlur={() => setTouched((prev) => ({ ...prev, cardNumber: true }))}
              placeholder={t('checkout.cardNumberPlaceholder')}
              inputMode="numeric"
              autoComplete="cc-number"
            />
            {(touched.cardNumber || submitted) && validationErrors.cardNumber && (
              <Text view="p-14" color="accent" className={styles.fieldError}>
                {validationErrors.cardNumber}
              </Text>
            )}
          </div>
          <div className={styles.cardRow}>
            <div className={styles.field}>
              <Text view="p-14" color="secondary">{t('checkout.expiry')}</Text>
              <Input
                value={expiry}
                onChange={(value) => setExpiry(sanitizeExpiry(value))}
                onBlur={() => setTouched((prev) => ({ ...prev, expiry: true }))}
                placeholder="MM/YY"
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              {(touched.expiry || submitted) && validationErrors.expiry && (
                <Text view="p-14" color="accent" className={styles.fieldError}>
                  {validationErrors.expiry}
                </Text>
              )}
            </div>
            <div className={styles.field}>
              <Text view="p-14" color="secondary">{t('checkout.cvv')}</Text>
              <Input
                value={cvv}
                onChange={(value) => setCvv(sanitizeCvv(value))}
                onBlur={() => setTouched((prev) => ({ ...prev, cvv: true }))}
                placeholder="123"
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {(touched.cvv || submitted) && validationErrors.cvv && (
                <Text view="p-14" color="accent" className={styles.fieldError}>
                  {validationErrors.cvv}
                </Text>
              )}
            </div>
          </div>
          <Button
            className={styles.confirmBtn}
            disabled={!isFormValid || loading}
            onClick={handleConfirm}
          >
            {loading ? t('checkout.processing') : `${t('checkout.pay')} $${totalPrice}`}
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Checkout;
