import { createContext, useContext } from 'react';
import type { AllProductsStore } from './store';

const AllProductsStoreContext = createContext<AllProductsStore | null>(null);

export const AllProductsStoreProvider = AllProductsStoreContext.Provider;

export const useAllProductsStore = (): AllProductsStore => {
  const store = useContext(AllProductsStoreContext);
  if (!store) {
    throw new Error();
  }
  return store;
};
