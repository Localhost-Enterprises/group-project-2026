import styles from './CartTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

import type { Data } from './CartTemplate.types';
import { Breadcrumbs, CartContent } from '@/components/organisms';
import { BackButton } from '@/components/organisms/BackButton/BackButton';

export const CartTemplate = ({ data }: { data: Data }) => {
  const { cartContent } = data;

  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <BackButton
        fallback="/"
        className={styles.backButton}
      >
        Back
      </BackButton>
      <Typography
        variant="h1"
        className={styles.cart}
      >
        Cart
      </Typography>

      <CartContent data={cartContent} />
    </div>
  );
};
