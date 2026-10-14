import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import '@/app/styles/tailwind.css';
import '@/app/styles/globals.scss';

import { ItemBlock } from './components/organisms/ItemBlock';
import type { ProductDetails } from '@/shared/types/ProductDetails';

const previewProduct: ProductDetails = {
  id: 'apple-iphone-11-pro-max-64gb-gold',
  namespaceId: 'apple-iphone-11-pro-max',
  name: 'Apple iPhone 11 Pro Max 64GB Gold',
  capacityAvailable: ['64GB', '256GB', '512GB'],
  capacity: '64GB',
  priceRegular: 1199,
  priceDiscount: 799,
  colorsAvailable: ['gold', 'midnightgreen', 'spacegray', 'silver'],
  color: 'gold',
  images: [],
  description: [],
  screen: '6.5” OLED',
  resolution: '2688x1242',
  processor: 'Apple A12 Bionic',
  ram: '3 GB',
  cell: [],
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.location.pathname === '/item-block-preview' ?
      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ width: '320px', flexShrink: 0 }}>
          <ItemBlock
            product={previewProduct}
            onAddToCart={(product) => {
              console.log('Добавляем товар:', product.name);
            }}
          />
        </div>
      </div>
    : <App />}
  </StrictMode>,
);
