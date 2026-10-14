import React from 'react';
import styles from './CategoryCard.module.scss';
import { Typography } from '@/components/atoms/Typography';
import { Link } from 'react-router-dom';
import { routePaths } from '@/app/router/routes';

interface Props {
  title: string;
  count: number;
  imageSrc: string;
  linkUrl: string;
  bgColor?: string;
}

export const CategoryCard: React.FC<Props> = ({
  title,
  count,
  imageSrc,
  linkUrl,
  bgColor,
}) => {
  return (
    <Link
      to={routePaths.catalog(linkUrl)}
      className={styles.card}
    >
      <div
        className={styles.imageContainer}
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={imageSrc}
          alt={`${title} category`}
          className={styles.image}
        />
      </div>

      <Typography variant="h4">{title}</Typography>

      <Typography
        variant="bodytext"
        className={styles.count}
      >
        {count} models
      </Typography>
    </Link>
  );
};
