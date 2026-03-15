'use client'

import { useRouter } from 'next/navigation';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import styles from './Success.module.scss';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Text view="title" color="primary">
        Order confirmed!
      </Text>
      <Text view="p-20" color="secondary">
        Thank you for your purchase. We will process your order shortly.
      </Text>
      <Button onClick={() => router.push('/')}>
        Back to shopping
      </Button>
    </div>
  );
};

export default SuccessPage;
