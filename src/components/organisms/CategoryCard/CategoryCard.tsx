import styles from './CategoryCard.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { Link } from 'react-router-dom';
import { routePaths } from '@/app/router/routes';

interface Props {
  title: string;
  count: number;
  imageSrc: string;
  linkUrl: string;
  backgroundSrc: string;
}

export const CategoryCard = ({
  title,
  count,
  imageSrc,
  linkUrl,
  backgroundSrc,
}: Props) => {
  return (
    <Link
      to={routePaths.catalog(linkUrl)}
      className={styles.card}
    >
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${backgroundSrc}` }}
      >
        <div className={styles.info}>
          <Typography
            variant="h3"
            className={styles.title}
          >
            {title}
          </Typography>
          <Typography
            variant="bodytext"
            className={styles.count}
          >
            {count} models
          </Typography>
        </div>

        <img
          src={imageSrc}
          alt={`${title} category`}
          className={styles.image}
        />
      </div>
    </Link>
  );
};
