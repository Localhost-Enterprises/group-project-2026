import { ProductTemplate } from '@/components/templates';
import { useProduct } from '@/entities/product';

import { useProductByIdInCategory } from '@/entities/product/model/product.queries';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from '@/components/templates/ProductTemplate/ProductTemplate.module.scss';

export type ProductContentProps = {
  id: string;
};

export const ProductLoadingSkeleton = () => (
  <div
    className={styles.container}
    aria-busy="true"
    aria-label="Loading product"
  >
    <Skeleton
      className={styles.backButton}
      width={48}
      height={20}
    />
    <Skeleton
      className={styles.title}
      width="60%"
      height={36}
    />
    <div className={styles.info}>
      <div className={styles.slider}>
        <Skeleton
          width="100%"
          count={1}
          height={288}
        />
      </div>
      <span className={styles.separator} />
      <div className={styles.purchase}>
        <Skeleton
          width="50%"
          height={28}
          style={{ marginBottom: 16 }}
        />
        <Skeleton
          width="35%"
          height={24}
          style={{ marginBottom: 16 }}
        />
        <Skeleton
          count={1}
          height={60}
        />
      </div>
    </div>
    <section className={styles.firstSection}>
      <Skeleton
        width="40%"
        height={28}
        style={{ marginBottom: 16 }}
      />
      <Skeleton
        count={1}
        height={30}
      />
    </section>
    <span className={styles.separator} />
    <section className={styles.secondSection}>
      <Skeleton
        width="45%"
        height={40}
        style={{ marginBottom: 16 }}
      />
      <Skeleton
        count={1}
        height={30}
      />
    </section>
  </div>
);

export const ProductContent = ({ id }: ProductContentProps) => {
  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useProduct(id);

  const {
    data: productDetails,
    isPending: isDetailsPending,
    isError: isDetailsError,
  } = useProductByIdInCategory(product?.category, product?.item_id);

  if (isProductPending) return <ProductLoadingSkeleton />;
  if (isProductError) return <p>Product Error</p>;
  if (!product) return <p>Product not found</p>;

  if (isDetailsPending) return <ProductLoadingSkeleton />;
  if (isDetailsError) return <p>Details Error</p>;
  if (!productDetails) return <p>Product details not found</p>;

  return (
    <ProductTemplate
      product={product}
      productDetails={productDetails}
    />
  );
};
