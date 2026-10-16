import { Typography } from '@/components/atoms/Typography';
import styles from './NotFouindTemplate.module.scss';
import classNames from 'classnames';

type Props = {
  title: string;
  image: string;
  className?: string;
};

export const NotFoundTemplate = ({ title, image, className }: Props) => {
  return (
    <section className={classNames(styles.container, className)}>
      <Typography
        variant="h2"
        className={styles.title}
      >
        {title}
      </Typography>
      <img
        src={image}
        alt={title}
        className={styles.image}
      />
    </section>
  );
};
