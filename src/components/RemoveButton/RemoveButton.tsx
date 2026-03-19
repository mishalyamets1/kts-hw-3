'use client';

import Image from 'next/image';
import Text from '@/components/ui-kit/Text';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './RemoveButton.module.scss';
import { useRouter } from 'next/navigation';

const RemoveButton = () => {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <button className={styles.removeButton} onClick={() => router.push('/')}>
        <Image
          src="/svg/arrow-left.svg"
          alt={t('backButton.alt')}
          className={styles.arrowIcon}
          width={32}
          height={32}
        />
        <Text view="p-20" color="primary">
          {t('backButton.text')}
        </Text>
      </button>
    </div>
  );
};

export default RemoveButton;
