import styles from './CartPage.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/Buttons/BackButton';
import { CartItem } from '@/components/organisms/CartItem';
import { CartCheckout } from '@/components/organisms/CartCheckout';
import { useCart } from '@/shared/hooks';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateCount, removeFromCart } = useCart();

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
      <div className={styles.content}>
        <div className={styles.items}>
          {cartItems.map(({ product, count }) => (
            <CartItem
              itemId={product.itemId}
              key={product.itemId}
              product={product}
              count={count}
              onCountChange={(nextcount) =>
                updateCount(product.itemId, nextcount)
              }
              onRemove={() => removeFromCart(product.itemId)}
            />
          ))}
        </div>
        <CartCheckout
          items={cartItems.map(({ product, count }) => ({
            price: product.price,
            count,
          }))}
        />
      </div>
    </div>
  );
};
