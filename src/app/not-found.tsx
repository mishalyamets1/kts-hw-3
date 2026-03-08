'use client';
import styles from './not-found.module.scss';
import Text from '@/components/ui-kit/Text';
import Button from '@/components/ui-kit/Button';
import { useRouter } from 'next/navigation';
export default function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Text view='title' color='accent' className={styles.code}>404</Text>
      <Text view='subtitle' color='secondary' className={styles.message}>Page not found</Text>
      <Button onClick={() => router.push('/')}>Home</Button>
    </div>
  );
}