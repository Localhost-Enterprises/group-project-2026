import { Typography } from '@/components/atoms/Typography';
import styles from './ProductSpecs.module.scss';

type Props = {
  specs: {
    specName: string;
    specText: string;
  }[];
};

export const ProductSpecs = ({ specs }: Props) => {
  return (
    <article className={styles.specs}>
      {specs.map(({ specName, specText }) => (
        <div
          key={`${specName}-${specText}`}
          className={styles.row}
        >
          <Typography
            variant="bodytext"
            className={styles.specName}
          >
            {specName}
          </Typography>

          <Typography
            variant="bodytext"
            className={styles.specText}
          >
            {specText}
          </Typography>
        </div>
      ))}
    </article>
  );
};
