import { makeAutoObservable, runInAction } from 'mobx';
import type { Product, ProductCategory, ProductsResponse } from '@/api/productsTypes';
import { PRODUCTS_PAGE_SIZE } from '@/configs/constants';

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

  private _setSearchParams: ((params: URLSearchParams) => void) | null = null;

  constructor() {
    makeAutoObservable<AllProductsStore, '_setSearchParams'>(this, { _setSearchParams: false });
  }

  setInitialData(products: Product[], total: number, categories: ProductCategory[]) {
    this.products = products;
    this.total = total;
    this.categories = categories;
    this.productsLoading = false;
    this.categoriesLoading = false;
  }

  setUrlUpdater(fn: (params: URLSearchParams) => void) {
    this._setSearchParams = fn;
  }

  resetUrlUpdater() {
    this._setSearchParams = null;
  }

  initializeFromUrl(searchParams: URLSearchParams) {
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const categories = searchParams.get('categories');
    const categoryIds = categories ? categories.split(',').map(Number) : [];

    this.searchTitle = search;
    this.currentPage = page;
    this.selectedCategoryIds = categoryIds;
  }

  buildSearchParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.searchTitle) params.set('search', this.searchTitle);
    if (this.currentPage > 1) params.set('page', String(this.currentPage));
    if (this.selectedCategoryIds.length > 0)
      params.set('categories', this.selectedCategoryIds.join(','));
    return params;
  }

  updateUrl() {
    const params = this.buildSearchParams();
    if (this._setSearchParams) {
      this._setSearchParams(params);
    } else {
      const newUrl = params.toString() ? `/?${params.toString()}` : '/';
      window.history.replaceState({}, '', newUrl);
    }
  }

  setSearchTitle(title: string) {
    this.searchTitle = title;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts();
  }

  setSelectedCategories(categoryIds: number[]) {
    this.selectedCategoryIds = categoryIds;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts();
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateUrl();
    this.fetchProducts();
  }

  async fetchAllProducts() {
    this.productsLoading = true;
    try {
      const params = new URLSearchParams();
      params.set('page', '1');
      params.set('pageSize', '1000');
      if (this.searchTitle) params.set('search', this.searchTitle);
      if (this.selectedCategoryIds.length > 0)
        params.set('categories', this.selectedCategoryIds.join(','));

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);

      const data: ProductsResponse = await response.json();
      runInAction(() => {
        this.products = data.data;
        this.total = data.meta?.pagination?.total;
      });
    } finally {
      runInAction(() => {
        this.productsLoading = false;
      });
    }
  }

  // хук useGetAllProducts
  async fetchProducts(pageSize = PRODUCTS_PAGE_SIZE) {
    this.productsLoading = true;
    try {
      const params = new URLSearchParams();
      params.set('page', String(this.currentPage));
      params.set('pageSize', String(pageSize));
      if (this.searchTitle) params.set('search', this.searchTitle);
      if (this.selectedCategoryIds.length > 0)
        params.set('categories', this.selectedCategoryIds.join(','));

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
      
      const data: ProductsResponse = await response.json();
      runInAction(() => {
        this.products = data.data;
        this.total = data.meta?.pagination?.total;
      });
    } finally {
      runInAction(() => {
        this.productsLoading = false;
      });
    }
  }
}
