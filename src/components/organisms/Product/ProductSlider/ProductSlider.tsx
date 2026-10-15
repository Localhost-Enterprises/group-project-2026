import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import classNames from 'classnames';

import 'swiper/css';

import styles from './ProductSlider.module.scss';

type Props = {
  images: string[];
  name: string;
  className?: string;
};

export const ProductSlider = ({ images, name, className }: Props) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={classNames(styles.slider, className)}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={classNames(styles.thumbnail, {
              [styles.activeThumbnail]: activeIndex === index,
            })}
            onClick={() => swiper?.slideTo(index)}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={activeIndex === index}
          >
            <img
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
            />
          </button>
        ))}
      </div>

      <Swiper
        className={styles.mainSlider}
        slidesPerView={1}
        onSwiper={setSwiper}
        onSlideChange={(instance) => {
          setActiveIndex(instance.activeIndex);
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={`${image}-${index}`}>
            <div className={styles.mainImage}>
              <img
                src={image}
                alt={`${name} image ${index + 1}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
