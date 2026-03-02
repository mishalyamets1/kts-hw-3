import { makeAutoObservable, runInAction } from 'mobx';
import { getCategories } from '@/api/getCategories';
import { getProducts } from '@/api/getProducts';
import type { Product, ProductCategory } from '@/api/productsTypes';

export class AllProductsStore {
  // хук useGetAllProducts
  products: Product[] = [];
  total: number | undefined = undefined;
  productsLoading = true;

  searchTitle = '';
  selectedCategoryIds: number[] = [];
  currentPage = 1;

  // Категории
  categories: ProductCategory[] = [];
  categoriesLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  initializeFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);

    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const categories = searchParams.get('categories');
    const categoryIds = categories ? categories.split(',').map(Number) : [];

    this.searchTitle = search;
    this.currentPage = page;
    this.selectedCategoryIds = categoryIds;
  }

  updateUrl() {
    const params = new URLSearchParams();

    if (this.searchTitle) {
      params.set('search', this.searchTitle);
    }
    if (this.currentPage > 1) {
      params.set('page', String(this.currentPage));
    }
    if (this.selectedCategoryIds.length > 0) {
      params.set('categories', this.selectedCategoryIds.join(','));
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : '/';

    window.history.pushState({}, '', newUrl);
  }

  setSearchTitle(title: string) {
    this.searchTitle = title;
    this.currentPage = 1;
    this.updateUrl();
  }

  setSelectedCategories(categoryIds: number[]) {
    this.selectedCategoryIds = categoryIds;
    this.currentPage = 1;
    this.updateUrl();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateUrl();
  }

  // Загружаем категории
  async fetchCategories() {
    this.categoriesLoading = true;
    try {
      const data = await getCategories();
      runInAction(() => {
        this.categories = data;
      });
    } finally {
      runInAction(() => {
        this.categoriesLoading = false;
      });
    }
  }

  // хук useGetAllProducts
  async fetchProducts(pageSize = 9) {
    this.productsLoading = true;
    try {
      const data = await getProducts({
        page: this.currentPage,
        pageSize,
        searchTitle: this.searchTitle,
        categoryIds: this.selectedCategoryIds,
      });
      runInAction(() => {
        this.products = data.data;
        this.total = data.meta?.pagination?.total;
        this.updateUrl();
      });
    } finally {
      runInAction(() => {
        this.productsLoading = false;
      });
    }
  }
}
