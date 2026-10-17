import { ProductCard } from '@/components/organisms/Product/ProductCard/';
import styles from './FavouritesTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { useFavouritesStore } from '@/entities/favourites';

export const FavouritesTemplate = () => {
  const favourites = useFavouritesStore((state) => state.favourites);

  const count = favourites.length;

  return (
    <div className={styles.container}>
      <div className={styles.headerFavourites}>
        <Typography variant="h1">Favourites</Typography>
        <p className={styles.count}>{`${count} items`}</p>
      </div>

      {favourites.map((item) => (
        <div
          key={item.id}
          className={styles.item}
        >
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
};
