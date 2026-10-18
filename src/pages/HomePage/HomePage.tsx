import type { HeroSliderData } from '@/components/organisms/HeroSlider';
import type { ProductsSlidesData } from '@/components/organisms/Product/ProductsSlider';
import type { ShopByCategoryData } from '@/components/organisms/ShopByCategory';
import { HomeTemplate } from '@/components/templates/HomeTemplate';

import { useProducts } from '@/entities/product/model/product.queries';
import { getBrandNewModels } from './lib/getBrandModels';
import { getHotPrices } from './lib/getHotPrices';
import { useEffect } from 'react';

import backgroundPhonesCategory from '@/shared/assets/images/phones_background.png?no-inline';
import imagePhonesCategory from '@/shared/assets/images/phones_product.png?no-inline';

import backgroundTabletsCategory from '@/shared/assets/images/tablets_background.png?no-inline';
import imageTabletsCategory from '@/shared/assets/images/tablets_product.png?no-inline';

import backgroundAccessoriesCategory from '@/shared/assets/images/accessories_background.png?no-inline';
import imageAccessoriesCategory from '@/shared/assets/images/accessories_product.png?no-inline';

import imagePhones from '@/shared/assets/images/phones.png?no-inline';
import imageAccessories from '@/shared/assets/images/accessories.png?no-inline';
import imageTablets from '@/shared/assets/images/tablets.png?no-inline';

import chip from '@/shared/assets/icons/Chip.svg';
import camera from '@/shared/assets/icons/Camera.svg';
import screen from '@/shared/assets/icons/Screen.svg';

const heroSliderData: HeroSliderData = {
  slides: [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      accentTitle: 'Now in our store!',
      subtitle: 'Pro. Beyond.',
      backgroundImage: backgroundPhonesCategory,
      image: imagePhones,
      buttonText: 'Order now',
      buttonLink: '/phones/apple-iphone-14-pro-128gb-gold',
      features: [
        {
          icon: chip,
          title: 'A16 Bionic chip',
          description: 'Super. Human.',
        },
        {
          icon: camera,
          title: 'Pro camera system',
          description: '48MP. More detail.',
        },
        {
          icon: screen,
          title: 'Brilliant display',
          description: 'Always-On. Always a step ahead.',
        },
      ],
      colorScheme: 'purple',
    },
    {
      id: 2,
      title: 'iWatch 74 Ultra',
      accentTitle: 'HAHAHAHA!',
      subtitle: 'Noob. False.',
      backgroundImage: backgroundAccessoriesCategory,
      image: imageAccessories,
      buttonText: 'Order now',
      buttonLink: '/accessories/apple-watch-series-6-40mm-space-gray',
      features: [
        {
          icon: chip,
          title: 'A16 Furry chip',
          description: 'Spider. Man.',
        },
        {
          icon: camera,
          title: 'Common camera system',
          description: '1.5MP. Less detail.',
        },
        {
          icon: screen,
          title: 'Stone display',
          description: 'Always-Off. Always a step behind.',
        },
      ],
      colorScheme: 'yellow',
    },
    {
      id: 3,
      title: 'iPad 2.5 Micro',
      accentTitle: 'Small! Micro!',
      subtitle: 'Buy. BUY!',
      backgroundImage: backgroundTabletsCategory,
      image: imageTablets,
      buttonText: 'Order later',
      buttonLink: '/tablets/apple-ipad-pro-11-2021-128gb-spacegray',
      features: [
        {
          icon: chip,
          title: 'No chip.',
          description: 'Sadly',
        },
        {
          icon: camera,
          title: 'No camera',
          description: 'No detail.',
        },
        {
          icon: screen,
          title: 'Paper display',
          description: 'Never on. Never. Maybe someday',
        },
      ],
      colorScheme: 'blue',
    },
  ],
};

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Home | NICE GADGETS';
  }, []);

  const { data: products = [], isPending } = useProducts();

  const phonesCount = products.filter(
    (product) => product.category === 'phones',
  ).length;

  const tabletsCount = products.filter(
    (product) => product.category === 'tablets',
  ).length;

  const accessoriesCount = products.filter(
    (product) => product.category === 'accessories',
  ).length;

  const shopByCategoryData: ShopByCategoryData = {
    sectionTitle: 'Shop by category',
    sectionSubtitle: 'Explore our range of products',
    categories: [
      {
        id: 'mobile-phones',
        title: 'Mobile phones',
        count: phonesCount,
        link: 'phones',
        image: imagePhonesCategory,
        background: backgroundPhonesCategory,
      },
      {
        id: 'tablets',
        title: 'Tablets',
        count: tabletsCount,
        link: 'tablets',
        image: imageTabletsCategory,
        background: backgroundTabletsCategory,
      },
      {
        id: 'accessories',
        title: 'Accessories',
        count: accessoriesCount,
        link: 'accessories',
        image: imageAccessoriesCategory,
        background: backgroundAccessoriesCategory,
      },
    ],
  };

  const newModels = getBrandNewModels(products);
  const hotPrices = getHotPrices(products);

  const brandNewModelsData: ProductsSlidesData = {
    sectionTitle: 'Brand new models',
    sectionSubTitle: 'The latest devices. Next level performance',
    productCards: newModels,
    isLoading: isPending,
  };

  const hotPricesData: ProductsSlidesData = {
    sectionTitle: 'Hot prices',
    sectionSubTitle: 'Great devices. Even better prices.',
    productCards: hotPrices,
    isLoading: isPending,
  };

  return (
    <HomeTemplate
      data={{
        heroSlider: heroSliderData,
        brandNewModels: brandNewModelsData,
        shopByCategory: shopByCategoryData,
        hotPrices: hotPricesData,
      }}
    />
  );
};
