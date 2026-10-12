import React from 'react';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  title: string;
  count: number;
  imageSrc: string;
  linkUrl: string;
  bgColor?: string;
  imageClassName?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
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

      <h4 className={styles.title}>{title}</h4>

      <span className={styles.count}>{count} models</span>
    </a>
  );
};
