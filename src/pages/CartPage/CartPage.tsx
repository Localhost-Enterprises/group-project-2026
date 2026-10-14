import styles from './CartPage.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { BackButton } from '@/components/molecules/Buttons/BackButton';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/entities/cart';
import { useProductByIds } from '@/entities/product';
import { CartContent } from '@/components/organisms/CartContent';

export const CartPage = () => {
  const navigate = useNavigate();
  // const { cartItems, updateCount, removeFromCart } = useCart();
  const items = useCartStore((state) => state.items);

  const productsIds = items.map((item) => item.productId);

  const {
    data: products = [],
    isPending: isPending,
    isError,
  } = useProductByIds(productsIds);

  const cartProducts = items
    .map((item) => {
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);

  console.log(items);
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

      {items.length === 0 && !isError && (
        <Typography variant="h3">Cart is empty</Typography>
      )}

      {items.length > 0 && isPending && (
        <Typography variant="h3">Loading...</Typography>
      )}

      {isError && <Typography variant="h3">Error</Typography>}

      {!isError && !isPending && items.length > 0 && (
        <CartContent cartProducts={cartProducts} />
      )}
    </div>
  );
};
