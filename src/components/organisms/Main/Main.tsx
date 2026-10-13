import styles from './Main.module.scss';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';

export const Main = () => {
  return (
    <div className={styles.container}>
      <ShopByCategory />
    </div>
  );
};
