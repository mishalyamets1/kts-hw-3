'use client'

import { useRouter } from 'next/navigation';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './Success.module.scss';

const SuccessPage = () => {
  const { t } = useI18n();
  const router = useRouter();

  return (
    <div className={styles.page}>
      <Text view="title" color="primary">
        {t('success.title')}
      </Text>
      <Text view="p-20" color="secondary">
        {t('success.message')}
      </Text>
      <Button onClick={() => router.push('/')}>
        {t('success.back')}
      </Button>
    </div>
  );
};

export default SuccessPage;
