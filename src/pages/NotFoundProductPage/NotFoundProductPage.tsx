import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import productNotFoundImage from '/img/product-not-found.png';
import { useEffect } from 'react';

export const NotFoundProductPage = () => {
  useEffect(() => {
    document.title = `Product Not Found | NICE GADGETS`;
  }, []);

  return (
    <NotFoundTemplate
      title="Product Not Found"
      image={productNotFoundImage}
    />
  );
};
