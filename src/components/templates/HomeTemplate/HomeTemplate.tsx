import {
  HeroSlider,
  ShopByCategory,
  ProductsSlider,
} from '@/components/organisms';

import type { Data } from './HomeTemplate.types';

import styles from './HomeTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { Cart } from '@/components/organisms/Cart';

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
        <HeroSlider data={heroSlider} />
        <ProductsSlider data={brandNewModels} />
        <ShopByCategory data={shopByCategory} />
        <ProductsSlider data={hotPrices} />
      </div>

      <Cart />
    </main>
  );
};
