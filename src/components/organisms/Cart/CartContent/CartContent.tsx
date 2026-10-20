import { useNavigate } from 'react-router-dom';
import { Typography } from '@/components/atoms/Typography';
import { CartCheckout } from '../CartCheckout';
import { CartItem } from '../CartItem';
import styles from './CartContent.module.scss';
import type { CartContentData } from './CartContent.types';
import { ROUTES } from '@/app/router/routes';

import emptyCartImage from '/img/cart-is-empty.png';

export const CartContent = ({ data }: { data: CartContentData }) => {
  const navigate = useNavigate();

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

  if (data.cartProducts.length === 0 && data.isPending) {
    return (
      <img
        src={emptyCartImage}
        alt="Cart is empty"
        className={styles.emptyCart}
      />
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
        onCheckout={() => navigate(ROUTES.CHECKOUT)}
      />
    </div>
  );
};
