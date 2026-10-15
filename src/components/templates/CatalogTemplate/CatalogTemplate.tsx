import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { CatalogFilter } from '@/components/organisms/CatalogFilter';
import type { Product } from '@/shared/types/Product';
import styles from './CatalogTemplate.module.scss';
import { ProductCard } from '@/components/organisms';
import { Typography } from '@/components/atoms/Typography';

type CatalogProduct = Pick<
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
> & {
  fullImageUrls: string[];
};

export interface CatalogTemplateData {
  items: CatalogProduct[];
  title: string;
}

export const CatalogTemplate = ({ data }: { data: CatalogTemplateData }) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <h1 className={styles.title}>
        {data.title === 'phones' ? 'Mobile phones' : data.title}
      </h1>
      <Typography
        className={styles.modelsCount}
        variant="bodytext"
      >
        {data.items.length} models
      </Typography>
      <CatalogFilter />
      <div className={styles.content}>
        {data.items.map((item) => (
          <ProductCard
            className={styles.card}
            key={item.id}
            id={item.id}
            name={item.name}
            images={item.fullImageUrls}
            price={item.price}
            fullPrice={item.fullPrice}
            screen={item.screen}
            capacity={item.capacity}
            ram={item.ram}
            item_id={item.item_id}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};
