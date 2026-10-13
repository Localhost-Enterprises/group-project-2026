import { HeroSlider } from '../HeroSlider';
import { useEffect, useState } from 'react';


import styles from './Main.module.scss';
import { ProductsSlider } from '../ProductsSlider';
import { ShopByCategory } from '../ShopByCategory/ShopByCategory';

type Product = {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
};

export const Main = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const newModels = products
    .filter((product) => product.category === 'phones')
    .sort((a, b) => b.year - a.year)
    .slice(0, 10)
    .map((product) => ({
      id: String(product.id),
      title: product.name,
      image: `/${product.image}`,
      price: String(product.price),
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
    }));

  const hotPrices = products
    .filter((product) => product.category === 'phones')
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10)
    .map((product) => ({
      id: String(product.id),
      title: product.name,
      image: `/${product.image}`,
      price: String(product.price),
      fullPrice:
        product.fullPrice > product.price ?
          String(product.fullPrice)
        : undefined,
      screen: product.screen,
      capacity: product.capacity,
      ram: product.ram,
    }));

  return (
    <div className={styles.container}>
      <HeroSlider />
      <div className={styles.sliderPreview}>
        <ProductsSlider
          title="Brand new models"
          products={newModels}
        />
        <ProductsSlider
          title="Hot prices"
          products={hotPrices}
        />
      </div>
      <ShopByCategory />
    </div>
  );
};
