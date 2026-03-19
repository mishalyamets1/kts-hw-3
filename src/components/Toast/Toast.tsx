'use client';

import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Text from '@/components/ui-kit/Text';
import { useI18n } from '@/components/providers/I18nProvider';
import { cartStore } from '@/stores/global/CartStore';
import styles from './Toast.module.scss';

const Toast = observer(() => {
  const { t } = useI18n();
  const { notification } = cartStore;

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => cartStore.clearNotification(), 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  if (!notification) return null;

  return (
    <div className={styles.toast}>
      <div className={styles.toast__text}>
        <span className={styles.toast__title}>
          <Text view="p-14" weight="bold">
            {notification.title}
          </Text>
        </span>
        <span className={styles.toast__subtitle}>
          <Text view="p-14">{t('toast.quantityInCart')} {notification.quantity}</Text>
        </span>
      </div>
    </div>
  );
});

export default Toast;
