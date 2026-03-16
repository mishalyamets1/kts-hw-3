'use client';

import Link from 'next/link';
import Image from 'next/image';
import Text from '@/components/ui-kit/Text';
import { useI18n } from '@/components/providers/I18nProvider';
import type { ProductCategory } from '@/api/productsTypes';
import styles from './Categoties.module.scss';

type CategoryWithProduct = ProductCategory & {
  firstProductImage?: string | null;
};

type Props = {
  categories: CategoryWithProduct[];
};

const Categories = ({ categories }: Props) => {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <Text view="title" color="primary">
        {t('categories.title')}
      </Text>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?categories=${category.id}`}
            className={styles.card}
          >
            {category.firstProductImage && (
              <div className={styles.imageWrapper}>
                <Image
                  src={category.firstProductImage}
                  alt={category.title}
                  width={200}
                  height={200}
                  className={styles.productImage}
                />
              </div>
            )}
            <Text view="p-20" weight="medium" color="primary">
              {category.title}
            </Text>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

