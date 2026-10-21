import { Typography } from '@/components/atoms/Typography';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';
import { useTranslation } from 'react-i18next';

import styles from './CartCheckout.module.scss';
import { useEffect } from 'react';

export type CartCheckoutItem = {
  price: number;
  count: number;
};

type Props = {
  items: CartCheckoutItem[];
  onCheckout?: () => void;
};

export const CartCheckout = ({ items, onCheckout }: Props) => {
  const { t } = useTranslation();

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
    <div className={styles.container}>
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
          {t('cartTotal', { count: totalItems })}
        </Typography>
      </div>

      <DefaultButton
        className={styles.checkoutButton}
        onClick={onCheckout}
        disabled={items.length === 0}
      >
        <Typography variant="button">{t('checkout')}</Typography>
      </DefaultButton>
    </div>
  );
};
