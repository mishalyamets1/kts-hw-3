'use client';
import styles from './not-found.module.scss';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/components/providers/I18nProvider';

export default function NotFound() {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Text view='title' color='accent' className={styles.code}>404</Text>
      <Text view='subtitle' color='secondary' className={styles.message}>{t('notFound.message')}</Text>
      <Button onClick={() => router.push('/')}>{t('notFound.home')}</Button>
    </div>
  );
}