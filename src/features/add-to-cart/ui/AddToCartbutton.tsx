import { TextButton } from '@/components/molecules';
import styles from './AddToCartbutton.module.scss';
import { selectAddItem, selectIsInCart, useCartStore } from '@/entities/cart';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/app/router';

type Props = {
  productId: number;
};

export const AddToCartButton = ({ productId }: Props) => {
  const addItem = useCartStore(selectAddItem);
  const isAdded = useCartStore(selectIsInCart(productId));
  const location = useLocation();

  return (
    <TextButton
      className={styles.button}
      selected={isAdded}
      onClick={isAdded ? () => {} : () => addItem(productId)}
    >
      {isAdded ?
        <Link
          to={ROUTES.CART}
          state={{ from: `${location.pathname}${location.search}` }}
        >
          Added to cart
        </Link>
      : 'Add to cart'}
    </TextButton>
  );
};
