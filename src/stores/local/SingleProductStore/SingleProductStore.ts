import { makeAutoObservable, runInAction } from 'mobx';
import { getProductById } from '@/api/getProductById';
import { getProductsByCategory } from '@/api/getProductsByCategory';
import type { Product } from '@/api/productsTypes';

export class SingleProductStore {
  // хук useGetProductById
  product: Product | null = null;
  productLoading = true;
  productError: string | null = null;

  // хук useGetProducts
  relatedProducts: Product[] | null = null;
  relatedLoading = false;
  relatedError: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }
  // хук useGetProductById
  async fetchProductById(documentId: string) {
    this.productLoading = true;
    this.productError = null;
    try {
      const data = await getProductById(documentId);
      runInAction(() => {
        this.product = data;
        this.productError = null;
      });
    } catch (error: unknown) {
      runInAction(() => {
        this.product = null;
        this.productError = error instanceof Error ? error.message : 'Ошибка при запуске товара';
      });
    } finally {
      runInAction(() => {
        this.productLoading = false;
      });
    }
  }

  // хук useGetProductsByCategory
  async fetchRelatedProducts(productCategoryId?: number | null) {
    if (!productCategoryId) return;
    this.relatedLoading = true;
    try {
      const data = await getProductsByCategory(productCategoryId);
      runInAction(() => {
        this.relatedProducts = data.data;
        this.relatedError = null;
      });
    } catch (error) {
      runInAction(() => {
        this.relatedError = error instanceof Error ? error.message : 'Ошибка при закгрузке товаров';
      });
    } finally {
      runInAction(() => {
        this.relatedLoading = false;
      });
    }
  }

  destroy() {
    this.product = null;
    this.product = null;
    this.productLoading = true;
    this.productError = null;
    this.relatedProducts = null;
    this.relatedLoading = false;
    this.relatedError = null;
  }
}
export const singleProductStore = new SingleProductStore();
