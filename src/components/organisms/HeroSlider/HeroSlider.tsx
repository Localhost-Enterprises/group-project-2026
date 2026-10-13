import { Typography } from '@/components/atoms/Typography';
import styles from './HeroSlider.module.scss';

import { Swiper as Slider, SwiperSlide as Slide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css/effect-fade';
import 'swiper/css';

import { ArrowButton } from '@/components/molecules';
import { useRef } from 'react';

import slideImage1 from '@/shared/assets/images/phoneSlider1.png';
import slideImage2 from '@/shared/assets/images/phoneSlider2.png';

export const HeroSlider = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.container}>
      <Typography
        variant="h1"
        className={styles.title}
      >
        Welcome to Nice Gadgets store!
      </Typography>

      <div className={styles.content}>
        <ArrowButton
          direction="left"
          onClick={() => swiperRef.current?.slidePrev()}
          className={styles.button}
        />

        <div className={styles.sliderContainer}>
          <div className={styles.banner}></div>
          <Slider
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className={styles.slider}
            modules={[EffectFade, Autoplay]}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            <Slide className={styles.slide}>
              <div className={styles.slideContent}>
                <div className={styles.slideInfo}>
                  <Typography variant="h3">iPhone 14 Pro</Typography>
                  <Typography
                    variant="smalltext"
                    className={styles.subtitle}
                  >
                    Pro. Beyond.
                  </Typography>
                </div>
                <div className={styles.imageContainer}>
                  <img
                    src={slideImage1}
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </Slide>

            <Slide className={styles.slide}>
              <div className={styles.slideContent}>
                <div className={styles.slideInfo}>
                  <Typography variant="h3">iPhone 13 asd</Typography>
                  <Typography
                    variant="smalltext"
                    className={styles.subtitle}
                  >
                    Pro. Beyond.
                  </Typography>
                </div>
                <div className={styles.imageContainer}>
                  <img
                    src={slideImage2}
                    alt="iPhone 14 Pro"
                  />
                </div>
              </div>
            </Slide>
          </Slider>
        </div>

        <ArrowButton
          direction="right"
          onClick={() => swiperRef.current?.slideNext()}
          className={styles.button}
        />
      </div>
    </section>
  );
};
