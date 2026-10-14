import React from 'react';
import styles from './ItemInfo.module.scss';
import classNames from 'classnames';
import { Typography } from '@/components/atoms/Typography';
import phonesRawData from '../../../../public/api/phones.json';

const {
  id,
  description,
  screen,
  resolution,
  processor,
  ram,
  capacity,
  camera,
  zoom,
  cell,
} = phonesRawData[0];

const descriptionArray = [{ id, description }];
console.log(descriptionArray);

const phones = {
  screen,
  resolution,
  processor,
  ram,
  'Build in memory': capacity,
  camera,
  zoom,
  cell,
};

export const ItemInfo = () => {
  return (
    <div className={styles.itemInfo}>
      <section className={styles.description}>
        <div className={styles.text}>
          <Typography
            variant="h3"
            className={styles.black}
          >
            About
          </Typography>
          <div className={styles.line}></div>
        </div>

        {descriptionArray.map(({ id, description }) => (
          <React.Fragment key={id}>
            {description.map((item) => (
              <div
                key={`${id}-${item.title}`}
                className={styles.text}
              >
                <Typography
                  variant="h4"
                  className={styles.black}
                >
                  {item.title}
                </Typography>

                {item.text.map((paragraph, i) => (
                  <Typography
                    key={`${id}-${i}`}
                    variant="bodytext"
                    className={classNames({
                      [styles.nextParagraph]: i > 0,
                    })}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </section>

      <section className={styles.specs}>
        <div className={styles.text}>
          <Typography
            variant="h3"
            className={styles.black}
          >
            Tech specs
          </Typography>
          <div className={styles.line}></div>
        </div>

        <dl className={styles.specsTable}>
          {Object.entries(phones).map(([key, value]) => (
            <div
              key={key}
              className={styles.specsRow}
            >
              <Typography
                variant="bodytext"
                as="dt"
                className={styles.text}
              >
                {key[0].toUpperCase() + key.slice(1)}
              </Typography>
              <Typography
                variant="bodytext"
                as="dd"
                className={classNames(styles.black, styles.cells)}
              >
                {Array.isArray(value) ? value.join(', ') : value}
              </Typography>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};
