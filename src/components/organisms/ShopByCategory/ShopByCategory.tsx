import React from 'react';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './ShopByCategory.module.scss';
import PhoneImage from '@/shared/assets/images/category-iphone-image.png';
import TabletImage from '@/shared/assets/images/category-tablets.png';
import AccesoriesImage from '@/shared/assets/images/category-colorful-phones.png';
import { Typography } from '@/components/atoms/Typography';

const categories = [
  {
    id: 'mobile-phones',
    title: 'Mobile phones',
    count: 95,
    imageSrc: PhoneImage,
    linkUrl: '/phones',
    backgroundColor: '#6D6474',
    imageClassName: 'imagePhones',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    count: 24,
    imageSrc: TabletImage,
    linkUrl: '/tablets',
    backgroundColor: '#8d8d92',
    imageClassName: 'imageTablets',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    count: 100,
    imageSrc: AccesoriesImage,
    linkUrl: '/accessories',
    backgroundColor: '#973d5f',
    imageClassName: 'imageAccessories',
  },
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.section}>
      <Typography
        variant="h2"
        className={styles.title}
      >
        Shop by category
      </Typography>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.cardWrapper}
          >
            <CategoryCard
              title={category.title}
              count={category.count}
              imageSrc={category.imageSrc}
              linkUrl={category.linkUrl}
              bgColor={category.backgroundColor}
              imageClassName={category.imageClassName}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
