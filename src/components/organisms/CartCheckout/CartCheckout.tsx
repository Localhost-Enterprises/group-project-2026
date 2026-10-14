import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';

import styles from './CartCheckout.module.scss';

export type CartCheckoutItem = {
  price: number;
  count: number;
};

type Props = {
  items: CartCheckoutItem[];
  onCheckout?: () => void;
};

export const CartCheckout = ({ items, onCheckout }: Props) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  const totalItems = items.reduce((total, item) => total + item.count, 0);

  return (
    <div
      className={styles.container}
      aria-label="Cart summary"
    >
      <div className={styles.summary}>
        <Typography
          className={styles.totalPrice}
          variant="h2"
        >
          ${totalPrice}
        </Typography>
        <Typography
          className={styles.itemCount}
          variant="bodytext"
        >
          Total for {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </Typography>
      </div>

      <DefaultButton
        className={styles.checkoutButton}
        onClick={onCheckout}
        disabled={items.length === 0}
      >
        <Typography variant="button">Checkout</Typography>
      </DefaultButton>
    </div>
  );
};
