import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { TextButton, IconButton } from '@/components/molecules';
import styles from './ProductCard.module.scss';
import { useState } from 'react';
import type { Product } from '@/shared/types';
import { Link } from 'react-router-dom';
import { routePaths } from '@/app/router/routes';

type Props = Pick<
  Product,
  | 'name'
  | 'image'
  | 'price'
  | 'fullPrice'
  | 'screen'
  | 'capacity'
  | 'ram'
  | 'itemId'
>;

export const ProductCard = ({
  name,
  image,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  itemId,
}: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  return (
    <article className={styles.card}>
      <Link to={routePaths.product(itemId)}>
        <img
          className={styles.image}
          src={image}
          alt={name}
        />

        <Typography
          variant="bodytext"
          as="h3"
          className={styles.title}
        >
          {name}
        </Typography>
      </Link>

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
        <TextButton
          className={styles.addToCart}
          selected={isAdded}
          onClick={() => setIsAdded(!isAdded)}
        >
          {isAdded ? 'Added to cart' : 'Add to cart'}
        </TextButton>

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
