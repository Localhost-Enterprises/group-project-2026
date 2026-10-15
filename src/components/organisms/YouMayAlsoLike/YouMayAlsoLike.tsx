import { ProductsSlider } from '@/components/organisms/ProductsSlider';
import { useProductByCategory } from '@/entities/product/model/product.queries';
import type { Category } from '@/shared/types/Category';
import { sortProductsBySimilarity } from './sortProductsBySimilarity';

type Props = {
  category: Category;
  currentProductId: number;
};

export const YouMayAlsoLike = ({ category, currentProductId }: Props) => {
  const { data: products = [] } = useProductByCategory(category);

  const currentProduct = products.find(
    (product) => product.id === currentProductId,
  );

  const recommendedProducts = sortProductsBySimilarity(
    products.filter((product) => product.id !== currentProductId),
    currentProduct,
  ).slice(0, 10);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <ProductsSlider
      data={{
        sectionTitle: 'You may also like',
        productCards: recommendedProducts,
      }}
    />
  );
};
