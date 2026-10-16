import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import productNotFoundImage from '/img/product-not-found.png';

export const NotFoundProductPage = () => {
  return (
    <NotFoundTemplate
      title="Product Not Found"
      image={productNotFoundImage}
    />
  );
};
