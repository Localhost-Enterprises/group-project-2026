import { Typography } from '@/components/atoms/Typography';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { TextButton, IconButton } from '@/components/molecules';
import styles from './ProductCard.module.scss';
import { useState } from 'react';

type Props = {
  title: string;
  image: string;
  price: string;
  screen: string;
  capacity: string;
  ram: string;
};

export const ProductCard = ({
  title,
  image,
  price,
  screen,
  capacity,
  ram,
}: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={image}
        alt={title}
      />

      <Typography
        variant="bodytext"
        as="h3"
        className={styles.title}
      >
        {title}
      </Typography>

      <Typography
        variant="h3"
        as="p"
      >
        ${price}
      </Typography>

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
        <TextButton className={styles.addToCart}>Add to cart</TextButton>

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
