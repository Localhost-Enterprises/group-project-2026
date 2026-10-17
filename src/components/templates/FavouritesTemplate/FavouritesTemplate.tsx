import { ProductCard } from '@/components/organisms/Product/ProductCard/';
import styles from './FavouritesTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { useFavouritesStore } from '@/entities/favourites';
import { Breadcrumbs } from '@/components/organisms';

export const FavouritesTemplate = () => {
  const favourites = useFavouritesStore((state) => state.favourites);

  const count = favourites.length;
  const itemText = count === 1 ? 'item' : 'items';

  return (
    <div className={styles.container}>
      <Breadcrumbs
        parts={['favourites']}
        className={styles.breadcrumbs}
      />

      <div className={styles.header}>
        <Typography
          variant="h1"
          className={styles.title}
        >
          Favourites
        </Typography>
        <Typography
          variant="bodytext"
          className={styles.count}
        >{`${count} ${itemText}`}</Typography>
      </div>

      <div className={styles.cartGrid}>
        {favourites.map((item) => (
          <div
            key={item.id}
            className={styles.item}
          >
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
