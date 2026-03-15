'use client';

import { useEffect } from 'react';
import styles from './error.module.scss';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import { useRouter } from 'next/navigation';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  return (
    <div className={styles.container}>
      <Text view='title' className={styles.title}>Something went wrong</Text>
      <Text view='p-20' className={styles.message}>
        {error.message}
      </Text> 
      <div className={styles.buttons}>
        <Button className={styles.btnOutline} onClick={reset}>
          Try again
        </Button>
        <Button  className={styles.btnPrimary} onClick={() => router.push('/')}>
          Home
        </Button>
      </div>
    </div>
  );
}