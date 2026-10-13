import { useRef } from 'react';
import classNames from 'classnames';

import { Swiper as Slider, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { EffectFade, Autoplay, Keyboard, A11y } from 'swiper/modules';
import { Slide } from './Slide/Slide';

import 'swiper/css/effect-fade';
import 'swiper/css';

import { OKIcon } from '@/components/atoms/Icons/OKIcon';

import { Typography } from '@/components/atoms/Typography';
import { ArrowButton, OptionButton } from '@/components/molecules';

import styles from './HeroSlider.module.scss';

import slideImage1 from '@/shared/assets/images/phoneSlider1.png';
import slideImage2 from '@/shared/assets/images/phoneSlider2.png';

const slides = [
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
];

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
          aria-label="Previous slide"
        />

        <div className={styles.sliderContainer}>
          <Typography
            as="h2"
            variant="h1"
            className={classNames(styles.bannerTitle, styles.bannerTitleMobile)}
          >
            Now available
            <br />
            in our store!
          </Typography>

          <div className={styles.banner}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerInfo}>
                <Typography
                  as="h2"
                  variant="h1"
                  className={styles.bannerTitle}
                >
                  Now available
                  <br />
                  <span className={styles.titleRow}>
                    in our store!
                    <OKIcon className={styles.emoji} />
                  </span>
                </Typography>

                <Typography
                  variant="bodytext"
                  className={styles.bannerSubtitle}
                >
                  Be the first!
                </Typography>
              </div>
              <OptionButton className={styles.bannerButton}>
                ORDER NOW
              </OptionButton>
            </div>
          </div>

          <Slider
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className={styles.slider}
            modules={[EffectFade, Autoplay, Keyboard, A11y]}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            a11y={{
              enabled: true,
            }}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {slides.map(({ id, title, subtitle, image }) => (
              <SwiperSlide
                key={id}
                className={styles.slide}
              >
                <Slide
                  title={title}
                  subtitle={subtitle}
                  image={image}
                />
              </SwiperSlide>
            ))}
          </Slider>
        </div>

        <ArrowButton
          direction="right"
          onClick={() => swiperRef.current?.slideNext()}
          className={styles.button}
          aria-label="Next slide"
        />
      </div>
    </section>
  );
};
