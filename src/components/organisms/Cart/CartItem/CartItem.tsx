import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import { CloseIcon, MinusIcon, PlusIcon, Typography } from '@/components/atoms';
import { DefaultButton, Rating } from '@/components/molecules';
import type { ProductRating } from '@/entities/product/api/product-ratings.api';

import { MAX_CART_ITEM_QUANTITY } from '@/entities/cart/model/cart.constants';
import {
  selectRemoveItem,
  selectUpdateQuantity,
  useCartStore,
} from '@/entities/cart';

import { useUsdToUahRate } from '@/shared/hooks/useUsdToUahRate';
import { formatPrice } from '@/shared/lib/formatPrice';
import { useCurrencyStore } from '@/shared/store/useCurrencyStore';
import type { Product, Rate } from '@/shared/types';

import { ImageWithFallback } from '../../ImageWithFallback';
import { ProductLink } from '../../Product/ProductLink';

import styles from './CartItem.module.scss';

type Props = (
  | { product: Product & { quantity: number }; isLoading?: false }
  | { product?: never; isLoading: true }
) & { rating?: ProductRating };

export const CartItem = (props: Props) => {
  const { t } = useTranslation();
  const { data: exchangeRate } = useUsdToUahRate();
  const currency = useCurrencyStore((state) => state.currency);

  const updateQuantity = useCartStore(selectUpdateQuantity);
  const removeItem = useCartStore(selectRemoveItem);
  if (props.isLoading) {
    return (
      <div
        className={styles.container}
        aria-busy="true"
        aria-label={t('loadingCartItem')}
      >
        <Skeleton
          width={32}
          height={32}
        />
        <Skeleton className={styles.image} />
        <Skeleton className={styles.name} />
        <div className={styles.bottomRow}>
          <div className={styles.count}>
            <Skeleton
              width={120}
              height={32}
            />
          </div>
          <Skeleton
            className={styles.price}
            height={24}
          />
        </div>
      </div>
    );
  }

  const { product, rating } = props;

  const onCountChange = (count: number) => updateQuantity(product.id, count);
  const handleRemove = () => removeItem(product.id);

  const imageSrc = product.imageUrls ? product.imageUrls[0] : '';

  const enterCount = (value: string, input: HTMLInputElement) => {
    const nextCount =
      value === '' ?
        product.quantity
      : Math.min(Math.max(Number(value), 1), MAX_CART_ITEM_QUANTITY);

    input.value = String(nextCount);

    if (nextCount !== product.quantity) {
      onCountChange(nextCount);
    }
  };

  return (
    <div className={`${styles.container} ${styles.loaded}`}>
      <DefaultButton
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label={t('removeCartItem', { name: product.name })}
      >
        <CloseIcon className={styles.removeIcon} />
      </DefaultButton>

      <ProductLink
        category={product.category}
        itemId={product.item_id}
      >
        <ImageWithFallback
          className={styles.image}
          src={imageSrc}
          alt={product.name}
        />
      </ProductLink>

      <div className={styles.productInfo}>
        <ProductLink
          category={product.category}
          itemId={product.item_id}
          className={styles.name}
        >
          {product.name}
        </ProductLink>

        {rating && rating.reviewsCount > 0 && (
          <div
            className={styles.rating}
            aria-label={`Rated ${rating.rating.toFixed(1)} out of 5`}
          >
            <Rating
              rate={Math.max(0, Math.min(5, Math.round(rating.rating))) as Rate}
              className={styles.ratingStars}
            />
            <span>{rating.rating.toFixed(1)}</span>
            <span>({rating.reviewsCount})</span>
          </div>
        )}
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.count}>
          <DefaultButton
            className={styles.countButton}
            onClick={() => onCountChange(product.quantity - 1)}
            disabled={product.quantity <= 1}
            aria-label={t('decreaseCartQuantity', { name: product.name })}
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
                value === '' ? '' : (
                  String(Math.min(Number(value), MAX_CART_ITEM_QUANTITY))
                );
            }}
            defaultValue={product.quantity}
            aria-label={`Set quantity for ${product.name}`}
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
            onClick={() =>
              onCountChange(
                Math.min(product.quantity + 1, MAX_CART_ITEM_QUANTITY),
              )
            }
            disabled={product.quantity >= MAX_CART_ITEM_QUANTITY}
            aria-label={t('increaseCartQuantity', { name: product.name })}
          >
            <PlusIcon />
          </DefaultButton>
        </div>

        <Typography
          className={styles.price}
          variant="h3"
        >
          {formatPrice(
            product.price * product.quantity,
            exchangeRate,
            currency,
          )}
        </Typography>
      </div>
    </div>
  );
};
