import { Typography } from '@/components/atoms/Typography';
import { CartCheckout } from '../CartCheckout';
import { CartItem } from '../CartItem';
import styles from './CartContent.module.scss';
import type { CartContentData } from './CartContent.types';

export const CartContent = ({ data }: { data: CartContentData }) => {
  if (data.items.length === 0 && !data.isError) {
    return <Typography variant="h3">Cart is empty</Typography>;
  }

  if (data.items.length > 0 && data.isPending) {
    return (
      <div className={styles.content}>
        <div className={styles.items}>
          {data.items.map((item) => (
            <CartItem
              key={item.productId}
              isLoading
            />
          ))}
        </div>
      </div>
    );
  }

  if (data.isError) {
    return <Typography variant="h3">Error</Typography>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.items}>
        {data.cartProducts.map((product) => {
          return (
            <CartItem
              product={product}
              key={product.id}
            />
          );
        })}
      </div>

      <CartCheckout
        items={data.cartProducts.map((product) => ({
          price: product.price,
          count: product.quantity,
        }))}
      />
    </div>
  );
};
