'use client';

import { useEffect } from 'react';
import styles from './error.module.scss';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/providers/I18nProvider';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  const { t } = useI18n();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();
  return (
    <div className={styles.container}>
      <Text view='title' className={styles.title}>{t('error.title')}</Text>
      <Text view='p-20' className={styles.message}>
        {error.message}
      </Text> 
      <div className={styles.buttons}>
        <Button className={styles.btnOutline} onClick={reset}>
          {t('error.tryAgain')}
        </Button>
        <Button  className={styles.btnPrimary} onClick={() => router.push('/')}>
          {t('error.home')}
        </Button>
      </div>
    </div>
  );
}