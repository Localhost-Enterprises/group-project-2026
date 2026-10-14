import type { CartState } from './cart.types';

export const selectCartItems = (state: CartState) => state.items;

export const selectCartCount = (state: CartState) =>
  state.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);

export const selectAddItem = (state: CartState) => state.addItem;

export const selectRemoveItem = (state: CartState) => state.removeItem;
