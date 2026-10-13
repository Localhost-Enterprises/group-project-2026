import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './ShopByCategory.module.scss';

import { Typography } from '@/components/atoms/Typography';
import type { ShopByCategoryData } from './ShopByCategory.types';

export const ShopByCategory = ({ data }: { data: ShopByCategoryData }) => {
  return (
    <section className={styles.section}>
      <Typography
        variant="h2"
        className={styles.title}
      >
        {data.sectionTitle}
      </Typography>

      <div className={styles.grid}>
        {data.categories.map((category) => (
          <div
            key={category.id}
            className={styles.cardWrapper}
          >
            <CategoryCard
              title={category.title}
              count={category.count}
              imageSrc={category.image}
              linkUrl={category.link}
              bgColor={category.color}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
