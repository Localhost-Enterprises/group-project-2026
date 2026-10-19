import { ProductCard } from '@/components/organisms/Product/ProductCard/';
import styles from './FavouritesTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { Breadcrumbs } from '@/components/organisms';
import type { Product } from '@/shared/types';
import { useTranslation } from 'react-i18next';

type Props = {
  data: Product[];
  count: number;
  isLoading: boolean;
};

export const FavouritesTemplate = ({ data, count, isLoading }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[{ label: t('favorites') }]}
        className={styles.breadcrumbs}
      />

      <div className={styles.header}>
        <Typography
          variant="h1"
          className={styles.title}
        >
          {t('favorites')}
        </Typography>
        <Typography
          variant="bodytext"
          className={styles.count}
        >
          {t('itemsCount', { count })}
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
              key={item.id}
              className={styles.item}
            />
          ))
        }
      </div>
    </div>
  );
};
