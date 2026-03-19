'use client';

import { useI18n } from '@/components/providers/I18nProvider';
import Text from '@/components/ui-kit/Text';
import styles from './HeroProducts.module.scss';

const HeroProducts = () => {
  const { t } = useI18n();

  return (
    <div className={styles.hero}>
      <Text className={styles.title} view="title" color="primary" tag="h1">
        {t('hero.title')}
      </Text>
      <Text className={styles.description} view="p-20" color="secondary" tag="h2" maxLines={2}>
        {t('hero.description')}
      </Text>
    </div>
  );
};

export default HeroProducts;
