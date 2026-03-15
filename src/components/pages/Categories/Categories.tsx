import Link from 'next/link';
import Text from '@/components/ui-kit/Text';
import type { ProductCategory } from '@/api/productsTypes';
import styles from './Categoties.module.scss';

type Props = {
  categories: ProductCategory[];
};

const Categories = ({ categories }: Props) => {
  return (
    <div className={styles.page}>
      <Text view="title" color="primary">
        Categories
      </Text>
      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/?categories=${category.id}`}
            className={styles.card}
          >
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

