import { Typography } from '@/components/atoms/Typography';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { MinusIcon } from '@/components/atoms/Icons/MinusIcon';
import { PlusIcon } from '@/components/atoms/Icons/PlusIcon';
import { DefaultButton } from '@/components/molecules/Buttons/DefaultButton';

import styles from './CartItem.module.scss';

export type CartItemProduct = {
  itemId: string;
  name: string;
  image: string;
  price: number;
};

type Props = {
  product: CartItemProduct;
  count: number;
  onCountChange: (count: number) => void;
  onRemove: () => void;
};

export const CartItem = ({
  product,
  count,
  onCountChange,
  onRemove,
}: Props) => {
  const imageSrc =
    product.image.startsWith('/') ? product.image : `/${product.image}`;

  return (
    <div className={styles.container}>
      <DefaultButton
        className={styles.removeButton}
        onClick={onRemove}
        aria-label={`Remove ${product.name} from cart`}
      >
        <CloseIcon className={styles.removeIcon} />
      </DefaultButton>

      <img
        className={styles.image}
        src={imageSrc}
        alt={product.name}
      />

      <Typography
        className={styles.name}
        variant="bodytext"
      >
        {product.name}
      </Typography>

      <div className={styles.bottomRow}>
        <div className={styles.count}>
          <DefaultButton
            className={styles.countButton}
            onClick={() => onCountChange(count - 1)}
            disabled={count <= 1}
            aria-label={`Decrease count of ${product.name}`}
          >
            <MinusIcon />
          </DefaultButton>

          <Typography
            className={styles.countValue}
            variant="bodytext"
            aria-live="polite"
          >
            {count}
          </Typography>

          <DefaultButton
            className={styles.countButton}
            onClick={() => onCountChange(count + 1)}
            aria-label={`Increase count of ${product.name}`}
          >
            <PlusIcon />
          </DefaultButton>
        </div>

        <Typography
          className={styles.price}
          variant="h3"
        >
          ${product.price * count}
        </Typography>
      </div>
    </div>
  );
};
