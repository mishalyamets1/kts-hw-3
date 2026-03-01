import { makeAutoObservable, runInAction } from 'mobx';
import type { CartItem } from 'api/productsTypes';
import { addToCart, getCart, removeFromCart } from 'api/cartApi';
export class CartStore {
  cartItems: CartItem[] = [];
  cartLoading = false;

  constructor() {
    makeAutoObservable(this);
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
    this.cartLoading = true;
    try {
      await addToCart(productId, quantity);
      const cartItems = await getCart();
      runInAction(() => {
        this.cartItems = cartItems;
      });
    } finally {
      runInAction(() => {
        this.cartLoading = false;
      });
    }
  }

  async removeItem(productId: number, quantity = 1) {
    this.cartLoading = true;
    try {
      await removeFromCart(productId, quantity);
      const cartItems = await getCart();

      runInAction(() => {
        this.cartItems = cartItems;
      });
    } finally {
      runInAction(() => {
        this.cartLoading = false;
      });
    }
  }

  async removeItemFull(productId: number) {
    const item = this.cartItems.find((i) => i.product.id === productId);
    if (!item) return;
    await this.removeItem(productId, item.quantity);
  }

  get ItemsCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
export const cartStore = new CartStore();
