import { useRef } from 'react';
import classNames from 'classnames';

import { Swiper as Slider, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import {
  EffectFade,
  Autoplay,
  Keyboard,
  A11y,
  Pagination,
} from 'swiper/modules';
import { Slide } from './Slide/Slide';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';

import styles from './HeroSlider.module.scss';

import type { HeroSliderData } from './HeroSlider.types';
import { Link } from 'react-router-dom';
import { OKIcon } from '@/components/atoms/Icons/OKIcon';
import { routePaths } from '@/app/router/routes';

type Props = { data: HeroSliderData; className?: string };
export const HeroSlider = ({ data, className }: Props) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={classNames(styles.container, className)}>
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
            {data.sliderTitle}
          </Typography>

          <div className={styles.banner}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerInfo}>
                <Typography
                  as="h2"
                  variant="h1"
                  className={styles.bannerTitle}
                >
                  {data.sliderTitle}
                  <OKIcon className={styles.emoji} />
                </Typography>

                <Typography
                  variant="bodytext"
                  className={styles.bannerSubtitle}
                >
                  {data.sliderSubtitle}
                </Typography>
              </div>
              <Link to={routePaths.catalog(data.sliderButtonLink)}>
                <Typography
                  variant="uppercase"
                  className={styles.bannerButton}
                >
                  {data.sliderButtonText}
                </Typography>
              </Link>
            </div>
          </div>

          <Slider
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className={styles.slider}
            modules={[EffectFade, Autoplay, Keyboard, A11y, Pagination]}
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
            pagination={{
              el: `.${styles.pagination}`,
              clickable: true,
            }}
          >
            {data.slides.map(({ id, title, subtitle, image }) => (
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
      <div className={styles.pagination} />
    </section>
  );
};
