import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { CatalogFilter } from '@/components/organisms/CatalogFilter';
import type { Product } from '@/shared/types/Product';
import styles from './CatalogTemplate.module.scss';
import { ProductCard } from '@/components/organisms';
import { Typography } from '@/components/atoms/Typography';

type CatalogProduct = Product;

export interface CatalogTemplateData {
  items: CatalogProduct[];
  title: string;
}

export const CatalogTemplate = ({ data }: { data: CatalogTemplateData }) => {
  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs} />
      <h1 className={styles.title}>
        {data.title === 'phones' ?
          'Mobile phones'
        : data.title[0].toUpperCase() + data.title.slice(1)}
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
            images={item.imageUrls || item.images}
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
