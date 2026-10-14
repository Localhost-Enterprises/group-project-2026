import styles from './Cart.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/Buttons/BackButton';
import { CartItem } from '@/components/organisms/CartItem';
import { CartCheckout } from '@/components/organisms/CartCheckout';
import { useCart } from '@/shared/hooks';

export const Cart = () => {
  const { cartItems, updateCount, removeFromCart } = useCart();

  return (
    <div className={styles.container}>
      <BackButton className={styles.backButton}>Back</BackButton>
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
