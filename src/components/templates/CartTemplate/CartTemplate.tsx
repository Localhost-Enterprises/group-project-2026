import styles from './CartTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/Buttons/BackButton';
import { useNavigate } from 'react-router-dom';

import type { Data } from './CartTemplate.types';
import { CartContent } from '@/components/organisms';

export const CartTemplate = ({ data }: { data: Data }) => {
  const navigate = useNavigate();
  const { cartContent } = data;

  return (
    <div className={styles.container}>
      <BackButton
        className={styles.backButton}
        onClick={() => navigate(-1)}
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
