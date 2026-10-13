import { useRef } from 'react';

import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';
import { ProductCard } from '../ProductCard';

import styles from './ProductsSlider.module.scss';
import type { ProductsSlidesData } from './ProductsSlider.types';

export const ProductsSlider = ({ data }: { data: ProductsSlidesData }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    sliderRef.current?.scrollBy({
      left: direction * sliderRef.current.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography variant="h2">{data.sectionTitle}</Typography>

        <div className={styles.arrows}>
          <ArrowButton
            direction="left"
            onClick={() => handleScroll(-1)}
          />

          <ArrowButton
            direction="right"
            onClick={() => handleScroll(1)}
          />
        </div>
      </div>

      <div
        className={styles.track}
        ref={sliderRef}
      >
        {data.productCards.map(({ id, ...product }) => (
          <div
            className={styles.item}
            key={id}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};
