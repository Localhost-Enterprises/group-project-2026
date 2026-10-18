import { Link } from 'react-router-dom';

import { Typography } from '@/components/atoms/Typography';
import styles from './Slide.module.scss';
import { TextButton } from '@/components/molecules';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';

type SlideFeature = {
  icon: string;
  title: string;
  description: string;
};

type Props = {
  title: string;
  accentTitle: string;
  subtitle: string;
  backgroundImage: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  features: SlideFeature[];
};

export const Slide = ({
  title,
  accentTitle,
  subtitle,
  backgroundImage,
  image,
  buttonText,
  buttonLink,
  features,
}: Props) => {
  return (
    <div
      className={styles.slideContent}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      <div className={styles.slideInfo}>
        <div className={styles.heading}>
          <Typography
            variant="smalltext"
            className={styles.eyebrow}
          >
            NEW ARRIVAL
          </Typography>

          <h2 className={styles.phoneTitle}>
            <span className={styles.title}>{title}</span>
            <span className={styles.accentTitle}>{accentTitle}</span>
          </h2>

          <Typography
            variant="smalltext"
            className={styles.subtitle}
          >
            {subtitle}
          </Typography>
        </div>

        <div className={styles.features}>
          {features.map((feature) => (
            <div
              key={feature.title}
              className={styles.feature}
            >
              <span
                className={styles.featureIcon}
                style={{
                  maskImage: `url("${feature.icon}")`,
                  WebkitMaskImage: `url("${feature.icon}")`,
                }}
                aria-hidden="true"
              />

              <span className={styles.featureTitle}>{feature.title}</span>

              <span className={styles.featureDescription}>
                {feature.description}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.actions}>
          <TextButton className={styles.button}>
            <Link
              to={buttonLink}
              className={styles.buttonLink}
            >
              {buttonText}
              <ArrowIcon direction="right" />
            </Link>
          </TextButton>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={title}
          draggable={false}
          data-swiper-parallax-y="200"
        />
      </div>
    </div>
  );
};
