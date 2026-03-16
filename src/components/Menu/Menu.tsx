'use client'

import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import Button from '@/components/ui-kit/Button';
import Input from '@/components/ui-kit/Input';
import MultiDropdown from '@/components/ui-kit/MultiDropdown';
import type { Option } from '@/components/ui-kit/MultiDropdown';
import Text from '@/components/ui-kit/Text';
import { useAllProductsStore } from '@/components/pages/HomePage/StoreContext';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './Menu.module.scss';
import debounce from 'debounce';

const Menu = observer(() => {
  const { t } = useI18n();
  const allProductsStore = useAllProductsStore();
  const [value, setValue] = useState('');
  const searchTitle = allProductsStore.searchTitle;

  useEffect(() => {
    setValue(searchTitle);
  }, [searchTitle]);

  const categoryOptions: Option[] = allProductsStore.categories.map((cat) => ({
    key: String(cat.id),
    value: cat.title,
  }));

  const selectedOptions: Option[] = allProductsStore.selectedCategoryIds.map((id) => ({
    key: String(id),
    value: allProductsStore.categories.find((c) => c.id === id)?.title || '',
  }));

  const handleSearch = (inputValue: string) => {
    setValue(inputValue);
  };

  const handleFindClick = () => {
    allProductsStore.setSearchTitle(value);
    allProductsStore.fetchProducts(9);
  };

  const handleFilterChange = (options: Option[]) => {
    const categoryIds = options.map((opt) => parseInt(opt.key));
    allProductsStore.setSelectedCategories(categoryIds);
    allProductsStore.fetchProducts(9);
  };

  const handleClearFilter = () => {
    setValue('');
    allProductsStore.setSelectedCategories([]);
    allProductsStore.setSearchTitle('');
    allProductsStore.fetchProducts(9);      
  };

  const hasActiveFilters =
    allProductsStore.selectedCategoryIds.length > 0 || allProductsStore.searchTitle !== '';

  return (
    <div className={styles.menu}>
      <div className={styles.inputBox}>
        <Input value={value} onChange={(handleSearch)} placeholder={t('menu.searchPlaceholder')} />
        <Button className={styles.btn} onClick={handleFindClick}>
          {t('menu.findNow')}
        </Button>
      </div>
      <div className={styles.filterBox}>
        <MultiDropdown
          className={styles.filter}
          options={categoryOptions}
          value={selectedOptions}
          onChange={handleFilterChange}
          getTitle={(value) => (value.length ? value.map((v) => v.value).join(', ') : t('menu.filter'))}
        />

        {hasActiveFilters && <Button onClick={handleClearFilter}>{t('menu.reset')}</Button>}
      </div>

      <div className={styles.totalBox}>
        <Text view="subtitle" color="primary">
          {t('menu.totalProducts')}
        </Text>
        <Text className={styles.count} view="p-20" weight="bold" color="accent">
          {allProductsStore.total}
        </Text>
      </div>
    </div>
  );
});

export default Menu;
