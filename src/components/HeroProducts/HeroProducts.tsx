import React from 'react';
import Text from 'components/ui-kit/Text';
import styles from 'components/HeroProducts/HeroProducts.module.scss';
const HeroProducts = () => {
  return (
    <div className={styles.hero}>
      <Text className={styles.title} view="title" color="primary" tag="h1">
        Products
      </Text>
      <Text className={styles.description} view="p-20" color="secondary" tag="h2" maxLines={2}>
        We display products based on the latest products we have, if you want to see our old
        products please enter the name of the item
      </Text>
    </div>
  );
};

export default HeroProducts;
