import { Typography } from '@/components/atoms/Typography';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { MinusIcon } from '@/components/atoms/Icons/MinusIcon';
import { PlusIcon } from '@/components/atoms/Icons/PlusIcon';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';

import styles from './CartItem.module.scss';
import type { Product } from '@/shared/types';
import {
  selectRemoveItem,
  selectUpdateQuantity,
  useCartStore,
} from '@/entities/cart';
import { ProductLink } from '../../Product/ProductLink';

export type CartItemProduct = {
  itemId: string;
  name: string;
  image: string;
  price: number;
};

type Props = {
  product: Product & { quantity: number };
};

export const CartItem = ({ product }: Props) => {
  const updateQuantity = useCartStore(selectUpdateQuantity);
  const removeItem = useCartStore(selectRemoveItem);

  const onCountChange = (count: number) => updateQuantity(product.id, count);
  const handleRemove = () => removeItem(product.id);

  const imageSrc =
    product.imageUrls ? product.imageUrls[0] : 'https://placehold.co/500x500';

  const enterCount = (value: string, input: HTMLInputElement) => {
    const nextCount =
      value === '' ?
        product.quantity
      : Math.min(Math.max(Number(value), 1), 99);

    input.value = String(nextCount);

    if (nextCount !== product.quantity) {
      onCountChange(nextCount);
    }
  };

  return (
    <div className={styles.container}>
      <DefaultButton
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={`Remove ${product.name} from cart`}
      >
        <CloseIcon className={styles.removeIcon} />
      </DefaultButton>

      <ProductLink
        category={product.category}
        itemId={product.item_id}
      >
        <img
          className={styles.image}
          src={imageSrc}
          alt={product.name}
        />
      </ProductLink>

      <ProductLink
        category={product.category}
        itemId={product.item_id}
        className={styles.name}
      >
        {product.name}
      </ProductLink>

      <div className={styles.bottomRow}>
        <div className={styles.count}>
          <DefaultButton
            className={styles.countButton}
            onClick={() => onCountChange(product.quantity - 1)}
            disabled={product.quantity <= 1}
            aria-label={`Decrease count of ${product.name}`}
          >
            <MinusIcon />
          </DefaultButton>

          <input
            key={product.quantity}
            className={styles.countInput}
            type="text"
            onChange={(event) => {
              const value = event.target.value.replace(/\D/g, '');
              event.target.value =
                value === '' ? '' : String(Math.min(Number(value), 99));
            }}
            defaultValue={product.quantity}
            onBlur={(event) =>
              enterCount(event.currentTarget.value, event.currentTarget)
            }
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.currentTarget.blur();
              }
            }}
          />

          <DefaultButton
            className={styles.countButton}
            onClick={() => onCountChange(Math.min(product.quantity + 1, 99))}
            disabled={product.quantity >= 99}
            aria-label={`Increase count of ${product.name}`}
          >
            <PlusIcon />
          </DefaultButton>
        </div>

        <Typography
          className={styles.price}
          variant="h3"
        >
          ${product.price * product.quantity}
        </Typography>
      </div>
    </div>
  );
};
