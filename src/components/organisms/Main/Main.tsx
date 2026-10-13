import { HeroSlider } from '../HeroSlider';
import styles from './Main.module.scss';

export const Main = () => {
  return (
    <div className={styles.container}>
      <HeroSlider />
    </div>
  );
};
