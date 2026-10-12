import React from 'react';
import styles from './CategoryCard.module.scss';
import { Typography } from '@/components/atoms/Typography';

interface Props {
  title: string;
  count: number;
  imageSrc: string;
  linkUrl: string;
  bgColor?: string;
  imageClassName?: string;
}

export const CategoryCard: React.FC<Props> = ({
  title,
  count,
  imageSrc,
  linkUrl,
  bgColor,
  imageClassName,
}) => {
  return (
    <a
      href={linkUrl}
      className={styles.card}
    >
      <div
        className={styles.imageContainer}
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={imageSrc}
          alt={`${title} category`}
          className={`${styles.image} ${imageClassName ? styles[imageClassName] : ''}`}
        />
      </div>

      <Typography variant="h4">{title}</Typography>

      <Typography
        variant="bodytext"
        className={styles.count}
      >
        {count}
      </Typography>
    </a>
  );
};
