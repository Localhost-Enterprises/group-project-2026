import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';

import styles from './CartCheckout.module.scss';
import { useEffect } from 'react';

import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { formatPrice } from '@/shared/lib/formatPrice';

export type CartCheckoutItem = {
  price: number;
  count: number;
};

type Props = {
  items: CartCheckoutItem[];
  onCheckout?: () => void;
};

export const CartCheckout = ({ items, onCheckout }: Props) => {
  const { data: exchangeRate } = useUsdToUahRate();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );
  const totalItems = items.reduce((total, item) => total + item.count, 0);

  useEffect(() => {
    localStorage.setItem('totalPrice', totalPrice.toString());
    localStorage.setItem('totalItems', totalItems.toString());
  }, [totalPrice, totalItems]);

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
          {formatPrice(totalPrice, exchangeRate)}
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
