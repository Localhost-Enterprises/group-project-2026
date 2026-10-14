import styles from './ProductPage.module.scss';
import { Typography } from '@/components/atoms/Typography';
import phonesRawData from '../../../public/api/phones.json';

const {
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

export const ProductPage = () => {
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

        <div className={styles.text}>
          <Typography
            variant="h4"
            className={styles.black}
          >
            {description[0].title}
          </Typography>
          <Typography variant="bodytext">{description[0].text[0]}</Typography>
          <Typography
            variant="bodytext"
            className={styles.secondParagraph}
          >
            {description[0].text[1]}
          </Typography>
        </div>

        <div className={styles.text}>
          <Typography
            variant="h4"
            className={styles.black}
          >
            {description[1].title}
          </Typography>
          <Typography variant="bodytext">{description[1].text[0]}</Typography>
        </div>

        <div className={styles.text}>
          <Typography
            variant="h4"
            className={styles.black}
          >
            {description[2].title}
          </Typography>
          <Typography variant="bodytext">{description[2].text[0]}</Typography>
        </div>
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
                className={styles.black}
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
