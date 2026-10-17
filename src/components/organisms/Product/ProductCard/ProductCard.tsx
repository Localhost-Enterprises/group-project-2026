import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { IconButton } from '@/components/molecules';
import styles from './ProductCard.module.scss';
import type { Product } from '@/shared/types';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductLink } from '../ProductLink';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useFavouritesStore } from '@/entities/favourites';

type Props = (
  | (Product & { isLoading?: never })
  | ({ isLoading: true } & {
      [K in keyof Product]?: never;
    })
) & {
  className?: string;
};

export const ProductCard = (props: Props) => {
  const cardId = props.isLoading ? 0 : props.id;
  const isFavourite = useFavouritesStore((state) => state.isFavourite(cardId));
  const toggleFavourite = useFavouritesStore((state) => state.toggleFavourite);

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

  return (
    <article className={classNames(styles.card, props.className)}>
      <ProductLink
        category={props.category}
        itemId={props.item_id}
      >
        <img
          className={styles.image}
          src={
            props.imageUrls?.[0] ||
            props.images[0] ||
            'https://placehold.co/500x500'
          }
          alt={props.name}
        />
      </ProductLink>

      <Typography
        variant="bodytext"
        as="h3"
        className={styles.title}
      >
        <ProductLink
          category={props.category}
          itemId={props.item_id}
        >
          {props.name}
        </ProductLink>
      </Typography>

      <div className={styles.prices}>
        <Typography
          variant="h3"
          as="span"
        >
          ${props.price}
        </Typography>

        {props.fullPrice && (
          <Typography
            variant="bodytext"
            as="span"
            className={styles.oldPrice}
          >
            <span className={styles.oldPriceValue}>${props.fullPrice}</span>
          </Typography>
        )}
      </div>

      <hr className={styles.divider} />

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <Typography
            variant="smalltext"
            className={styles.propName}
          >
            Screen
          </Typography>
          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {props.screen}
          </Typography>
        </div>

        <div className={styles.specRow}>
          <Typography
            variant="smalltext"
            className={styles.propName}
          >
            Capacity
          </Typography>
          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {props.capacity}
          </Typography>
        </div>

        <div className={styles.specRow}>
          <Typography
            variant="smalltext"
            className={styles.propName}
          >
            RAM
          </Typography>
          <Typography
            variant="smalltext"
            className={styles.propText}
          >
            {props.ram}
          </Typography>
        </div>
      </div>

      <div className={styles.actions}>
        <AddToCartButton productId={props.id} />
        <IconButton
          className={styles.favourite}
          selected={isFavourite}
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
          onClick={() => toggleFavourite(props)}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
        />
      </div>
    </article>
  );
};
