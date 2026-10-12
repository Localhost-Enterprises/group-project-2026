import React from 'react';
import { CategoryCard } from '../CategoryCard/CategoryCard';
import styles from './ShopByCategory.module.scss';

const categories = [
  {
    id: 'mobile-phones',
    title: 'Mobile phones',
    count: 95,
    imageSrc: '../../../../public/img/category-iphone-image.png',
    linkUrl: '/phones',
    backgroundColor: '#6D6474',
    imageClassName: 'imagePhones',
  },
  {
    id: 'tablets',
    title: 'Tablets',
    count: 24,
    imageSrc: '../../../../public/img/category-tablets.png',
    linkUrl: '/tablets',
    backgroundColor: '#8d8d92',
    imageClassName: 'imageTablets',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    count: 100,
    imageSrc: '../../../../public/img/category-colorful-phones.png',
    linkUrl: '/accessories',
    backgroundColor: '#973d5f',
    imageClassName: 'imageAccessories',
  },
];

export const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Shop by category</h2>

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
