'use client'

import { observer } from 'mobx-react-lite';
import { useState, useEffect, useRef } from 'react';
import debounce from 'debounce';
import Button from '@/components/ui-kit/Button';
import Input from '@/components/ui-kit/Input';
import MultiDropdown from '@/components/ui-kit/MultiDropdown';
import type { Option } from '@/components/ui-kit/MultiDropdown';
import Text from '@/components/ui-kit/Text';
import { useAllProductsStore } from '@/components/pages/HomePage/StoreContext';
import { useI18n } from '@/components/providers/I18nProvider';
import styles from './Menu.module.scss';

const Menu = observer(() => {
  const { t } = useI18n();
  const allProductsStore = useAllProductsStore();
  const [value, setValue] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const searchTitle = allProductsStore.searchTitle;

  // Create debounced function for price change
  const debouncedPriceChange = useRef(
    debounce((min: string, max: string) => {
      const minVal = min ? parseInt(min) : null;
      const maxVal = max ? parseInt(max) : null;
      allProductsStore.setPriceRange(minVal, maxVal);
    }, 500)
  ).current;

  useEffect(() => {
    setValue(searchTitle);
  }, [searchTitle]);

  useEffect(() => {
    setPriceMin(allProductsStore.priceMin ? String(allProductsStore.priceMin) : '');
    setPriceMax(allProductsStore.priceMax ? String(allProductsStore.priceMax) : '');
  }, [allProductsStore.priceMin, allProductsStore.priceMax]);

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
  };

  const handleFilterChange = (options: Option[]) => {
    const categoryIds = options.map((opt) => parseInt(opt.key));
    allProductsStore.setSelectedCategories(categoryIds);
  };

  useEffect(() => {
    debouncedPriceChange(priceMin, priceMax);
  }, [priceMin, priceMax, debouncedPriceChange]);

  const handleSortToggle = () => {
    if (allProductsStore.sortOrder === 'none') {
      allProductsStore.setSortOrder('asc');
    } else if (allProductsStore.sortOrder === 'asc') {
      allProductsStore.setSortOrder('desc');
    } else {
      allProductsStore.setSortOrder('none');
    }
  };

  const getSortButtonLabel = () => {
    switch (allProductsStore.sortOrder) {
      case 'asc':
        return t('menu.sortAscending');
      case 'desc':
        return t('menu.sortDescending');
      default:
        return t('menu.sort');
    }
  };

  const handleClearFilter = () => {
    setValue('');
    setPriceMin('');
    setPriceMax('');
    allProductsStore.setSelectedCategories([]);
    allProductsStore.setPriceRange(null, null);
    allProductsStore.setSortOrder('none');
    allProductsStore.setSearchTitle('');
  };

  const hasActiveFilters =
    allProductsStore.selectedCategoryIds.length > 0 ||
    allProductsStore.searchTitle !== '' ||
    allProductsStore.priceMin !== null ||
    allProductsStore.priceMax !== null ||
    allProductsStore.sortOrder !== 'none';

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

        <div className={styles.priceContainer}>
          <div className={styles.priceInputs}>
            <Input
              value={priceMin}
              onChange={setPriceMin}
              placeholder={t('menu.priceMin')}
              type="number"
            />
            <Input
              value={priceMax}
              onChange={setPriceMax}
              placeholder={t('menu.priceMax')}
              type="number"
            />
          </div>
        </div>

        <div className={styles.sortAndResetContainer}>
          <Button
            onClick={handleSortToggle}
            className={allProductsStore.sortOrder !== 'none' ? styles.activeSort : styles.sortBtn}
          >
            {getSortButtonLabel()}
          </Button>

          {hasActiveFilters && <Button className={styles.reset} onClick={handleClearFilter}>{t('menu.reset')}</Button>}
        </div>
      </div>

      <div className={styles.totalBox}>
        <Text view="subtitle" color="primary">
          {t('menu.totalProducts')}
        </Text>
        <Text className={styles.count} view="p-20" weight="bold" color="accent">
          {allProductsStore.filteredCount}
        </Text>
      </div>
    </div>
  );
});

export default Menu;
