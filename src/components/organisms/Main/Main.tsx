import styles from './Main.module.scss';
import { ProductCard } from '../ProductCard';

export const Main = () => {
  return (
    <div className={styles.container}>
      <h1>Main</h1>
      <ProductCard
        title="Apple iPhone 14 Pro 128GB Gold"
        image="/img/phones/apple-iphone-14-pro/gold/00.webp"
        price="999"
        screen='6.1" OLED'
        capacity="128 GB"
        ram="6 GB"
      />
    </div>
  );
};
