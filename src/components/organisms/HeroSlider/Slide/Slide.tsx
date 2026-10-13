import { Typography } from '@/components/atoms/Typography';
import styles from './Slide.module.scss';

type Props = {
  title: string;
  subtitle: string;
  image: string;
};

export const Slide = ({ title, subtitle, image }: Props) => {
  return (
    <div className={styles.slideContent}>
      <div className={styles.slideInfo}>
        <Typography
          variant="h3"
          className={styles.phoneTitle}
        >
          {title}
        </Typography>

        <Typography
          variant="smalltext"
          className={styles.subtitle}
        >
          {subtitle}
        </Typography>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};
