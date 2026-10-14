import { useCartStore } from '@/entities/cart';
import { useProductByIds } from '@/entities/product';
import { CartTemplate } from '@/components/templates';

export const CartPage = () => {
  const items = useCartStore((state) => state.items);

  const productsIds = items.map((item) => item.productId);

  const {
    data: products = [],
    isPending: isPending,
    isError,
  } = useProductByIds(productsIds);

  const cartProducts = items
    .map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);

  const data = {
    cartContent: {
      items,
      cartProducts,
      isError,
      isPending,
    },
  };

  return <CartTemplate data={data}></CartTemplate>;
};
