import type { HeroSliderData } from '@/components/organisms/HeroSlider';
import type { ProductsSliderProps } from '@/components/organisms/ProductsSlider';
import type { ShopByCategoryProps } from '@/components/organisms/ShopByCategory';

export type Data = {
  heroSlider: HeroSliderData;
  brandNewModels: ProductsSliderProps;
  shopByCategory: ShopByCategoryProps;
  hotPrices: ProductsSliderProps;
};
