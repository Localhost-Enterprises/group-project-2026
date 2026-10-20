import styles from './ProductTemplate.module.scss';
import { Typography } from '@/components/atoms/Typography';

import {
  Breadcrumbs,
  CommentsSection,
  ProductPurchase,
  ProductRating,
  ProductSlider,
} from '@/components/organisms';

import { ProductSection } from '@/components/organisms/Product/ProductSection';
import { ProductDescription } from '@/components/organisms/Product/ProductDescription';
import { ProductSpecs } from '@/components/organisms/Product/ProductSpecs';

import type { AnyProductDetails, Product } from '@/shared/types';
import { getProductSpecs } from '@/entities/product/lib/getProductSpecs';
import type {
  WithImageUrls,
  With360ImageUrls,
} from '@/shared/types/WithImageUrls';
import { BackButton } from '@/components/organisms/BackButton/BackButton';
import { YouMayAlsoLike } from '@/components/organisms/YouMayAlsoLike';

type Props = {
  product: WithImageUrls<Product>;
  productDetails: With360ImageUrls<AnyProductDetails>;
};

export const ProductTemplate = ({ product, productDetails }: Props) => {
  const specs = getProductSpecs(productDetails);

  return (
    <div className={styles.container}>
      <Breadcrumbs
        parts={[product.category, product.name]}
        className={styles.breadcrumbs}
      />

      <BackButton
        className={styles.backButton}
        fallback={`/${product.category}`}
      >
        Back
      </BackButton>

      <div className={styles.titleRow}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {product.name}
        </Typography>
        <ProductRating namespaceId={productDetails.namespace_id} />
      </div>

      <div className={styles.info}>
        <ProductSlider
          key={productDetails.id}
          images={productDetails.imageUrls}
          images360={productDetails.image360Urls ?? []}
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

      <CommentsSection
        key={productDetails.namespace_id}
        namespaceId={productDetails.namespace_id}
        category={product.category}
        productId={productDetails.id}

        className={styles.comments}
      />
      <YouMayAlsoLike
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};
