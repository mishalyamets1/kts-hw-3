import { makeAutoObservable, runInAction } from 'mobx';
import type { Product, ProductCategory, ProductsResponse } from '@/api/productsTypes';
import { PRODUCTS_PAGE_SIZE } from '@/configs/constants';

export type SortOrder = 'asc' | 'desc' | 'none';

export class AllProductsStore {
  // хук useGetAllProducts
  products: Product[] = [];
  allProducts: Product[] = []; // Storage for all products to calculate filtered count
  total: number | undefined = undefined;
  productsLoading = true;

  searchTitle = '';
  selectedCategoryIds: number[] = [];
  currentPage = 1;

  priceMin: number | null = null;
  priceMax: number | null = null;
  sortOrder: SortOrder = 'none';

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
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const sortOrder = searchParams.get('sort') as SortOrder | null;

    this.searchTitle = search;
    this.currentPage = page;
    this.selectedCategoryIds = categoryIds;
    this.priceMin = priceMin ? parseInt(priceMin) : null;
    this.priceMax = priceMax ? parseInt(priceMax) : null;
    this.sortOrder = sortOrder || 'none';
  }

  buildSearchParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.searchTitle) params.set('search', this.searchTitle);
    if (this.currentPage > 1) params.set('page', String(this.currentPage));
    if (this.selectedCategoryIds.length > 0)
      params.set('categories', this.selectedCategoryIds.join(','));
    if (this.priceMin !== null) params.set('priceMin', String(this.priceMin));
    if (this.priceMax !== null) params.set('priceMax', String(this.priceMax));
    if (this.sortOrder !== 'none') params.set('sort', this.sortOrder);
    return params;
  }

  updateUrl() {
    const params = this.buildSearchParams();
    if (this._setSearchParams) {
      this._setSearchParams(params);
    } else {
      const newUrl = params.toString() ? `/?${params.toString()}` : '/';
      // Use replaceState instead of router.replace to prevent scroll jump
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', newUrl);
      }
    }
  }

  setSearchTitle(title: string, pageSize: number = 9) {
    this.searchTitle = title;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts(pageSize);
  }

  setSelectedCategories(categoryIds: number[], pageSize: number = 9) {
    this.selectedCategoryIds = categoryIds;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts(pageSize);
  }

  setPriceRange(min: number | null, max: number | null, pageSize: number = 9) {
    this.priceMin = min;
    this.priceMax = max;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts(pageSize);
  }

  setSortOrder(order: SortOrder, pageSize: number = 9) {
    this.sortOrder = order;
    this.currentPage = 1;
    this.updateUrl();
    this.fetchProducts(pageSize);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
    this.updateUrl();
    this.fetchProducts();
  }

  private applyPriceFilterAndSort(products: Product[]): Product[] {
    let filtered = products;

    if (this.priceMin !== null || this.priceMax !== null) {
      filtered = filtered.filter((p) => {
        if (this.priceMin !== null && p.price < this.priceMin) return false;
        if (this.priceMax !== null && p.price > this.priceMax) return false;
        return true;
      });
    }

    if (this.sortOrder === 'asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }

  async fetchAllProducts(updateLoading = true) {
    if (updateLoading) this.productsLoading = true;
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
        this.allProducts = data.data;
        if (updateLoading) {
          this.products = this.applyPriceFilterAndSort(data.data);
        }
        this.total = data.meta?.pagination?.total;
      });
    } finally {
      if (updateLoading) {
        runInAction(() => {
          this.productsLoading = false;
        });
      }
    }
  }

  private get hasPriceFilter(): boolean {
    return this.priceMin !== null || this.priceMax !== null;
  }

  // хук useGetAllProducts
  async fetchProducts(pageSize = PRODUCTS_PAGE_SIZE) {
    this.productsLoading = true;
    try {
      if (this.hasPriceFilter || this.sortOrder !== 'none') {
        // Client-side pagination: fetch all, filter, then slice
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
          this.allProducts = data.data;
          const filtered = this.applyPriceFilterAndSort(data.data);
          this.total = filtered.length;
          const start = (this.currentPage - 1) * pageSize;
          this.products = filtered.slice(start, start + pageSize);
        });
      } else {
        // Server-side pagination: no price filter or sort active
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
      }
    } finally {
      runInAction(() => {
        this.productsLoading = false;
      });
    }
  }

  get filteredCount(): number {
    return this.total ?? 0;
  }
}
