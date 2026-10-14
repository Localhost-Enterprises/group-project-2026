import { useCallback } from 'react';

import type { CartItemProduct } from '@/components/organisms/CartItem';
import { useLocalStorage } from './useLocalStorage';

const CART_STORAGE_KEY = 'cart';

export type CartEntry = {
  product: CartItemProduct;
  count: number;
};

const readStoredCart = (): CartEntry[] => {
  const storedValue = localStorage.getItem(CART_STORAGE_KEY);

  if (storedValue === null) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    return Array.isArray(parsedValue) ? (parsedValue as CartEntry[]) : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const [cartItems, setCartItems] = useLocalStorage<CartEntry[]>(
    CART_STORAGE_KEY,
    [],
  );

  const addToCart = useCallback(
    (product: CartItemProduct) => {
      const currentCart = readStoredCart();
      const existingItem = currentCart.find(
        (item) => item.product.itemId === product.itemId,
      );

      const updatedCart =
        existingItem ?
          currentCart.map((item) =>
            item.product.itemId === product.itemId ?
              { ...item, count: item.count + 1 }
            : item,
          )
        : [...currentCart, { product, count: 1 }];

      setCartItems(updatedCart);
    },
    [setCartItems],
  );

  const updateCount = useCallback(
    (itemId: string, count: number) => {
      const currentCart = readStoredCart();
      const updatedCart =
        count < 1 ?
          currentCart.filter((item) => item.product.itemId !== itemId)
        : currentCart.map((item) =>
            item.product.itemId === itemId ? { ...item, count } : item,
          );

      setCartItems(updatedCart);
    },
    [setCartItems],
  );

  const removeFromCart = useCallback(
    (itemId: string) => {
      const updatedCart = readStoredCart().filter(
        (item) => item.product.itemId !== itemId,
      );

      setCartItems(updatedCart);
    },
    [setCartItems],
  );

  return { cartItems, addToCart, updateCount, removeFromCart };
};
