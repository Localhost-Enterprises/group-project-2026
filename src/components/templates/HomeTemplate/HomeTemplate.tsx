import {
  HeroSlider,
  ShopByCategory,
  ProductsSlider,
} from '@/components/organisms';

import type { Data } from './HomeTemplate.types';

import styles from './HomeTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

export const HomeTemplate = ({ data }: { data: Data }) => {
  const { pageTitle, heroSlider, brandNewModels, shopByCategory, hotPrices } =
    data;

  return (
    <main className={styles.container}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        {pageTitle}
      </Typography>

      <div className={styles.content}>
        <HeroSlider
          data={heroSlider}
          className={styles.slider}
        />
        <ProductsSlider
          data={brandNewModels}
          className={styles.brandNewModels}
        />
        <ShopByCategory
          data={shopByCategory}
          className={styles.shopByCategory}
        />
        <ProductsSlider
          data={hotPrices}
          className={styles.hotPrices}
        />
      </div>
    </main>
  );
};
