import type { HeroSliderData } from '@/components/organisms/HeroSlider';
import type { ProductsSlidesData } from '@/components/organisms/Product/ProductsSlider';
import type { ShopByCategoryData } from '@/components/organisms/ShopByCategory';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

import slideImage1 from '@/shared/assets/images/phoneSlider1.png';
import slideImage2 from '@/shared/assets/images/phoneSlider2.png';

import { hotPrices, newModels } from './tempObject';

import PhoneImage from '@/shared/assets/images/category-iphone.png';
import TabletImage from '@/shared/assets/images/category-tablets.png';
import AccesoriesImage from '@/shared/assets/images/category-accesories.png';

const heroSliderData: HeroSliderData = {
  sliderTitle: 'Now available in our store!',
  sliderSubtitle: 'Be the first!',
  sliderButtonText: 'Order now',
  sliderButtonLink: 'phones',
  slides: [
    {
      id: 'iphone-14-pro',
      title: 'iPhone 14 Pro',
      subtitle: 'Pro. Beyond',
      image: slideImage1,
    },
    {
      id: 'iphone-13-common',
      title: 'iPhone 13 Common',
      subtitle: 'Common. Default',
      image: slideImage2,
    },
  ],
};

const brandNewModelsData: ProductsSlidesData = {
  sectionTitle: 'Brand new models',
  productCards: newModels,
};

const shopByCategoryData: ShopByCategoryData = {
  sectionTitle: 'Shop by category',
  categories: [
    {
      id: 'mobile-phones',
      title: 'Mobile phones',
      count: 95,
      image: PhoneImage,
      link: 'phones',
      color: '#6D6474',
    },
    {
      id: 'tablets',
      title: 'Tablets',
      count: 24,
      image: TabletImage,
      link: 'tablets',
      color: '#8d8d92',
    },
    {
      id: 'accessories',
      title: 'Accessories',
      count: 100,
      image: AccesoriesImage,
      link: 'accessories',
      color: '#973d5f',
    },
  ],
};

const hotPricesData: ProductsSlidesData = {
  sectionTitle: 'Hot prices',
  productCards: hotPrices,
};

export const HomePage = () => {
  return (
    <HomeTemplate
      data={{
        pageTitle: 'Welcome to Nice Gadgets store!',
        heroSlider: heroSliderData,
        brandNewModels: brandNewModelsData,
        shopByCategory: shopByCategoryData,
        hotPrices: hotPricesData,
      }}
    />
  );
};
