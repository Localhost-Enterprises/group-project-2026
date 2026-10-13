import { HeroSlider, ShopByCategory } from '@/components/organisms';
import { ProductsSlider } from '@/components/organisms/';
import type { Data } from './HomeTemplate.types';

export const HomeTemplate = ({ data }: { data: Data }) => {
  const { heroSlider, brandNewModels, shopByCategory, hotPrices } = data;
  return (
    <section>
      <HeroSlider data={heroSlider} />
      <ProductsSlider data={brandNewModels} />
      <ShopByCategory data={shopByCategory} />
      <ProductsSlider data={hotPrices} />
    </section>
  );
};
