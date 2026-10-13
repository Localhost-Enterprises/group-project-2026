import { useRef } from 'react';
import type { ComponentProps } from 'react';

import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';
import { ProductCard } from '../ProductCard';

import styles from './ProductsSlider.module.scss';

type Product = ComponentProps<typeof ProductCard> & {
  id: string;
};

type Props = {
  title: string;
  products: Product[];
};

export const ProductsSlider = ({ title, products }: Props) => {
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
        <Typography variant="h2">{title}</Typography>

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
        {products.map(({ id, ...product }) => (
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
