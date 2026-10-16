import styles from './ProductTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

import {
  Breadcrumbs,
  ProductPurchase,
  ProductSlider,
} from '@/components/organisms';

import { ProductSection } from '@/components/organisms/Product/ProductSection';
import { ProductDescription } from '@/components/organisms/Product/ProductDescription';
import { ProductSpecs } from '@/components/organisms/Product/ProductSpecs';

import type { Accessory, Phone, Product, Tablet } from '@/shared/types';
import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';
import type { WithImageUrls } from '@/shared/types/WithImageUrls';
import { BackButton } from '@/components/organisms/BackButton/BackButton';

type Props = {
  product: WithImageUrls<Product>;
  productDetails: WithImageUrls<Phone | Tablet | Accessory>;
};

export const ProductTemplate = ({ product, productDetails }: Props) => {
  const specs = getProductSpecs(productDetails);
  return (
    <div className={styles.container}>
      <Breadcrumbs className={styles.breadcrumbs} />
      <BackButton
        className={styles.backButton}
        fallback={`/${product.category}`}
      >
        Back
      </BackButton>

      <Typography
        variant="h2"
        className={styles.title}
      >
        {product.name}
      </Typography>

      <div className={styles.info}>
        <ProductSlider
          key={productDetails.id}
          images={productDetails.imageUrls}
          name={productDetails.name}
          className={styles.slider}
        />

        <span className={styles.separator} />

        <ProductPurchase
          product={product}
          productDetails={productDetails}
          className={styles.purchase}
        />
      </div>

      <ProductSection
        title="About"
        className={styles.firstSection}
      >
        <ProductDescription description={productDetails.description} />
      </ProductSection>

      <span className={styles.separator} />

      <ProductSection
        title="Tech specs"
        className={styles.secondSection}
      >
        <ProductSpecs specs={specs} />
      </ProductSection>
    </div>
  );
};
