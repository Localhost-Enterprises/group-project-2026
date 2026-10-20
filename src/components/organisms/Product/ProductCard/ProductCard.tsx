import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { IconButton } from '@/components/molecules';
import { Rating } from '@/components/molecules/Rating/Rating';

import { AddToCartButton } from '@/features/add-to-cart';
import { useFavouritesStore } from '@/entities/favourites';
import { animateProductToHeader } from '@/shared/lib/animateProductToHeader';

import type { Product, Rate } from '@/shared/types';
import type { ProductRating } from '@/entities/product/api/product-ratings.api';

import { ProductLink } from '../ProductLink';

import screen from '@/shared/assets/icons/Screen.svg';
import ram from '@/shared/assets/icons/Ram.svg';
import memory from '@/shared/assets/icons/Memory.svg';

import styles from './ProductCard.module.scss';

type Props = (
  | {
      product: Product;
      isLoading?: never;
    }
  | {
      product?: never;
      isLoading: true;
    }
) & {
  rating?: ProductRating;
  className?: string;
};

export const ProductCard = ({
  product,
  isLoading,
  rating,
  className,
}: Props) => {
  const cardId = isLoading ? 0 : product.id;

  const isFavourite = useFavouritesStore((state) => state.isFavourite(cardId));

  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

  if (isLoading) {
    return (
      <article
        className={classNames(styles.card, className)}
        aria-busy="true"
        aria-label="Loading product"
      >
        <div className={styles.ratingBadge}>
          <Skeleton
            width={76}
            height={18}
          />
        </div>

        <Skeleton className={styles.image} />

        <Skeleton
          className={styles.title}
          height={20}
        />

        <div className={styles.prices}>
          <Skeleton
            width={80}
            height={24}
          />
        </div>

        <div className={styles.specs}>
          {Array.from({ length: 3 }, (_, index) => (
            <div
              className={styles.specRow}
              key={index}
            >
              <Skeleton width={48} />
              <Skeleton width={64} />
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <Skeleton
            width={160}
            height={40}
          />
          <Skeleton
            width={40}
            height={40}
          />
        </div>
      </article>
    );
  }

  const formattedScreen =
    product.screen.length > 10 ?
      `${product.screen.slice(0, 7)}...`
    : product.screen;

  const roundedRating =
    rating ? (Math.max(0, Math.min(5, Math.round(rating.rating))) as Rate) : 0;

  return (
    <article className={classNames(styles.card, styles.loaded, className)}>
      {rating && rating.reviewsCount > 0 && (
        <div
          className={styles.ratingBadge}
          aria-label={`Rated ${rating.rating.toFixed(1)} out of 5 from ${rating.reviewsCount} reviews`}
        >
          <Rating
            rate={roundedRating}
            className={styles.ratingStars}
          />

          <span className={styles.ratingValue}>{rating.rating.toFixed(1)}</span>

          <span className={styles.reviewsCount}>({rating.reviewsCount})</span>
        </div>
      )}

      <ProductLink
        category={product.category}
        itemId={product.item_id}
      >
        <img
          className={styles.image}
          data-product-image={product.id}
          src={
            product.imageUrls?.[0] ||
            product.images[0] ||
            'https://placehold.co/500x500'
          }
          alt={product.name}
        />
      </ProductLink>

      <Typography
        variant="bodytext"
        as="h3"
        className={styles.title}
      >
        <ProductLink
          category={product.category}
          itemId={product.item_id}
        >
          {product.name}
        </ProductLink>
      </Typography>

      <div className={styles.prices}>
        <Typography
          variant="h3"
          as="span"
        >
          ${product.price}
        </Typography>

        {product.fullPrice && (
          <Typography
            variant="bodytext"
            as="span"
            className={styles.oldPrice}
          >
            <span className={styles.oldPriceValue}>${product.fullPrice}</span>
          </Typography>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <img
            src={memory}
            alt="Capacity"
            className={styles.specIcon}
          />

          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {product.capacity}
          </Typography>
        </div>

        <div className={styles.specRow}>
          <img
            src={ram}
            alt="RAM"
            className={styles.specIcon}
          />

          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {product.ram}
          </Typography>
        </div>

        <div className={styles.specRow}>
          <img
            src={screen}
            alt="Screen Diagonal"
            className={styles.specIcon}
          />

          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {formattedScreen}
          </Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <AddToCartButton productId={product.id} />

        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
          onClick={() => {
            if (!isFavourite) {
              animateProductToHeader(product.id, 'favourites');
            }

            toggleFavourite(product);
          }}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
        />
      </div>
    </article>
  );
};
