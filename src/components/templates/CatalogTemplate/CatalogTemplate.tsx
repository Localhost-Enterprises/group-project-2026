import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { CatalogFilter } from '@/components/organisms/CatalogFilter';
import type { Product } from '@/shared/types/Product';
import styles from './CatalogTemplate.module.scss';
import { ProductCard } from '@/components/organisms';
import { Typography } from '@/components/atoms/Typography';
import { CatalogPagination } from '@/components/organisms/CatalogPagination/CatalogPagination';

type CatalogProduct = Product;

export interface CatalogTemplateData {
  items: CatalogProduct[];
  totalItems: number;
  title: string;
  isLoading: boolean;
}

type Props = {
  data: CatalogTemplateData;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const CatalogTemplate = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs
        parts={[data.title]}
        className={styles.breadcrumbs}
      />

      <h1 className={styles.title}>
        {data.title === 'phones' ?
          'Mobile phones'
        : data.title[0].toUpperCase() + data.title.slice(1)}
      </h1>

      <Typography
        className={styles.modelsCount}
        variant="bodytext"
      >
        {data.totalItems} models
      </Typography>

      <CatalogFilter />

      <div className={styles.content}>
        {data.isLoading ?
          Array.from({ length: 8 }, (_, index) => (
            <ProductCard
              className={styles.card}
              key={`skeleton-${index}`}
              isLoading
            />
          ))
        : data.items.map((item) => (
            <ProductCard
              className={styles.card}
              product={item}
              key={item.id}
            />
          ))
        }
      </div>

      <CatalogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className={styles.pagination}
      />
    </div>
  );
};
