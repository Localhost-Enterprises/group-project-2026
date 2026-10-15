import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { ProductCard } from '@/components/organisms/ProductCard';
import type { Product } from '@/shared/types/Product';
import styles from './CatalogTemplate.module.scss';

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
  | 'itemId'
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
            itemId={item.itemId}
          />
        ))}
      </div>
    </div>
  );
};
