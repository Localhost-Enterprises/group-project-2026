import { CartCheckout } from '../CartCheckout';
import { CartItem } from '../CartItem';
import styles from './CartContent.module.scss';
import type { Product } from '@/shared/types';

type Props = {
  cartProducts: (Product & { quantity: number })[];
};

export const CartContent = ({ cartProducts }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.items}>
        {cartProducts.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
            />
          );
        })}
      </div>

      <CartCheckout
        items={cartProducts.map((product) => ({
          price: product.price,
          count: product.quantity,
        }))}
      />
    </div>
  );
};
