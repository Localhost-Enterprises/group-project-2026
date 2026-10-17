import { ProductCard } from '@/components/organisms/Product/ProductCard/';
import styles from './FavouritesTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/organisms';
import type { Product } from '@/shared/types';

type Props = {
  data: Product[];
};

export const FavouritesTemplate = ({ data }: Props) => {
  const count = data.length;
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

      <div className={styles.grid}>
        {data.map((item) => (
          <ProductCard
            product={item}
            key={item.id}
            className={styles.item}
          />
        ))}
      </div>
    </div>
  );
};
