import { ProductCard } from '@/components/organisms/Product/ProductCard/';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/organisms';

import type { Product } from '@/shared/types';
import type { ProductRating } from '@/entities/product/api/product-ratings.api';

import styles from './FavouritesTemplate.module.scss';

type Props = {
  data: Product[];
  ratingsMap: Map<string, ProductRating>;
  count: number;
  isLoading: boolean;
};

export const FavouritesTemplate = ({
  data,
  ratingsMap,
  count,
  isLoading,
}: Props) => {
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
        >
          {`${count} ${itemText}`}
        </Typography>
      </div>

      <div className={styles.grid}>
        {isLoading ?
          Array.from({ length: count }, (_, index) => (
            <ProductCard
              isLoading
              key={`skeleton-${index}`}
              className={styles.item}
            />
          ))
        : data.map((item) => (
            <ProductCard
              product={item}
              rating={ratingsMap.get(item.namespace_id)}
              key={item.id}
              className={styles.item}
            />
          ))
        }
      </div>
    </div>
  );
};
