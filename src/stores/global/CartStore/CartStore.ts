import { makeAutoObservable, runInAction } from 'mobx';
import { addToCart, getCart, removeFromCart } from '@/api/cartApi';
import type { CartItem } from '@/api/productsTypes';

export type CartNotification = {
  title: string;
  quantity: number;
};

export class CartStore {
  cartItems: CartItem[] = [];
  cartLoading = false;
  updatingItemIds = new Set<number>();
  notification: CartNotification | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearNotification() {
    this.notification = null;
  }

  clearCart() {
    this.cartItems = [];
  }

  async fetchCart() {
    this.cartLoading = true;
    try {
      const data = await getCart();
      runInAction(() => {
        this.cartItems = data;
      });
    } finally {
      runInAction(() => {
        this.cartLoading = false;
      });
    }
  }

  async addItem(productId: number, quantity = 1) {
    runInAction(() => {
      this.updatingItemIds.add(productId);
    });

    // Оптимистичное обновление
    runInAction(() => {
      const existingItem = this.cartItems.find((item) => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      }
    });

    try {
      await addToCart(productId, quantity);
      const cartItems = await getCart();
      runInAction(() => {
        this.cartItems = cartItems;
        const addedItem = cartItems.find((item) => item.product.id === productId);
        this.notification = {
          title: addedItem?.product.title ?? 'Товар',
          quantity: addedItem?.quantity ?? quantity,
        };
      });
    } catch {
      // Откат при ошибке
      const cartItems = await getCart();
      runInAction(() => {
        this.cartItems = cartItems;
      });
    } finally {
      runInAction(() => {
        this.updatingItemIds.delete(productId);
      });
    }
  }

  
  async removeItem(productId: number, quantity = 1) {
    runInAction(() => {
      this.updatingItemIds.add(productId);
    });

    // Оптимистичное обновление
    runInAction(() => {
      const existingItem = this.cartItems.find((item) => item.product.id === productId);
      if (existingItem) {
        existingItem.quantity -= quantity;
        if (existingItem.quantity <= 0) {
          this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
        }
      }
    });

    try {
      await removeFromCart(productId, quantity);
      const cartItems = await getCart();
      runInAction(() => {
        this.cartItems = cartItems;
      });
    } catch {
      const cartItems = await getCart();
      runInAction(() => {
        this.cartItems = cartItems;
      });
    } finally {
      runInAction(() => {
        this.updatingItemIds.delete(productId);
      });
    }
  }

  async removeItemFull(productId: number) {
    const item = this.cartItems.find((i) => i.product.id === productId);
    if (!item) return;
    await this.removeItem(productId, item.quantity);
  }

  isItemUpdating(productId: number): boolean {
    return this.updatingItemIds.has(productId);
  }

  get itemsCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getItemQuantity(productId: number): number {
    return this.cartItems.find((item) => item.product.id === productId)?.quantity ?? 0;
  }
}
export const cartStore = new CartStore();
