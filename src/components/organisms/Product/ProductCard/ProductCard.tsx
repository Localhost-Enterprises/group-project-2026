import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { IconButton } from '@/components/molecules';
import styles from './ProductCard.module.scss';
import { useState } from 'react';
import type { Product } from '@/shared/types';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductLink } from '../ProductLink';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ProductProps = Pick<
  Product,
  | 'id'
  | 'name'
  | 'images'
  | 'imageUrls'
  | 'price'
  | 'fullPrice'
  | 'screen'
  | 'capacity'
  | 'ram'
  | 'item_id'
  | 'category'
> & { className: string; isLoading?: false };

type Props = ProductProps | { className: string; isLoading: true };

export const ProductCard = (props: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  if (props.isLoading) {
    return (
      <article
        className={classNames(styles.card, props.className)}
        aria-busy="true"
        aria-label="Loading product"
      >
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
        <hr className={styles.divider} />
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

  const {
    id,
    category,
    name,
    images,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
    item_id,
    className,
  } = props;

  return (
    <article className={classNames(styles.card, className)}>
      <ProductLink
        category={category}
        itemId={item_id}
      >
        <img
          className={styles.image}
          src={imageUrls?.[0] || images[0] || 'https://placehold.co/500x500'}
          alt={name}
        />
      </ProductLink>

      <Typography
        variant="bodytext"
        as="h3"
        className={styles.title}
      >
        <ProductLink
          category={category}
          itemId={item_id}
        >
          {name}
        </ProductLink>
      </Typography>

      <div className={styles.prices}>
        <Typography
          variant="h3"
          as="span"
        >
          ${price}
        </Typography>

        {fullPrice && (
          <Typography
            variant="bodytext"
            as="span"
            className={styles.oldPrice}
          >
            <span className={styles.oldPriceValue}>${fullPrice}</span>
          </Typography>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <Typography variant="smalltext">Screen</Typography>
          <Typography variant="smalltext">{screen}</Typography>
        </div>

        <div className={styles.specRow}>
          <Typography variant="smalltext">Capacity</Typography>
          <Typography variant="smalltext">{capacity}</Typography>
        </div>

        <div className={styles.specRow}>
          <Typography variant="smalltext">RAM</Typography>
          <Typography variant="smalltext">{ram}</Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <AddToCartButton productId={id} />
        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
          onClick={() => setIsFavourite(!isFavourite)}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
        />
      </div>
    </article>
  );
};
