import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { IconButton } from '@/components/molecules';
import styles from './ProductCard.module.scss';
import { useState } from 'react';
import type { Product } from '@/shared/types';
import { AddToCartButton } from '@/features/add-to-cart';
import { ProductLink } from '../ProductLink';

type Props = Pick<
  Product,
  | 'id'
  | 'name'
  | 'images'
  | 'price'
  | 'fullPrice'
  | 'screen'
  | 'capacity'
  | 'ram'
  | 'item_id'
  | 'category'
>;

export const ProductCard = ({
  id,
  name,
  images,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  item_id,
  category,
}: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={images[0] || 'https://placehold.co/500x500'}
        alt={name}
      />
      <ProductLink
        category={category}
        itemId={item_id}
        className={styles.title}
      >
        {name}
      </ProductLink>

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
