import styles from './Main.module.scss';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';
import { Breadcrumbs } from '../Breadcrumbs';

export const Main = () => {
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <ShopByCategory />
    </div>
  );
};
