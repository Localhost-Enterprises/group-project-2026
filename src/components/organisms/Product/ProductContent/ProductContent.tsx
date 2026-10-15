import { ProductTemplate } from '@/components/templates';
import { useProduct } from '@/entities/product';

import { useProductByIdInCategory } from '@/entities/product/model/product.queries';

export type ProductContentProps = {
  id: string;
};

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

  if (isProductPending) return <p>Loading...</p>;
  if (isProductError) return <p>Product Error</p>;
  if (!product) return <p>Product not found</p>;

  if (isDetailsPending) return <p>Loading...</p>;
  if (isDetailsError) return <p>Details Error</p>;
  if (!productDetails) return <p>Product details not found</p>;

  return (
    <ProductTemplate
      product={product}
      productDetails={productDetails}
    />
  );
};
