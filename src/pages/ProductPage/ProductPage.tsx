import { useParams } from 'react-router-dom';

import { ProductTemplate } from '@/components/templates';
import { ProductLoadingSkeleton } from '@/components/organisms/Product/ProductContent/ProductContent';

import {
  useProduct,
  useProductByIdInCategory,
} from '@/entities/product/model/product.queries';

import type { Category } from '@/shared/types/Category';

export const ProductPage = () => {
  const { productSlug } = useParams<'productSlug'>();

  const {
    data: product,
    isPending: isProductPending,
    isError: isProductError,
  } = useProduct(productSlug ?? '');

  const {
    data: productDetails,
    isPending: isDetailsPending,
    isError: isDetailsError,
  } = useProductByIdInCategory(
    product?.category as Category | undefined,
    product?.item_id,
  );

  if (isProductPending) return <ProductLoadingSkeleton />;
  if (isProductError) return <p>Product error</p>;
  if (!product) return <p>Product not found</p>;

  if (isDetailsPending) return <ProductLoadingSkeleton />;
  if (isDetailsError) return <p>Details error</p>;
  if (!productDetails) return <p>Details not found</p>;

  return (
    <ProductTemplate
      product={product}
      productDetails={productDetails}
    />
  );
};
