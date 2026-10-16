import type { Product } from '@/shared/types';

const getSimilarityScore = (
  product: Product,
  currentProduct: Product,
): number => {
  const yearDifference = Math.abs(product.year - currentProduct.year);

  const yearScore =
    yearDifference === 0 ? 4
    : yearDifference === 1 ? 2
    : 0;

  const capacityScore =
    product.capacity && product.capacity === currentProduct.capacity ? 3 : 0;

  const screenScore =
    product.screen && product.screen === currentProduct.screen ? 2 : 0;

  const ramScore = product.ram && product.ram === currentProduct.ram ? 2 : 0;

  return yearScore + capacityScore + screenScore + ramScore;
};

export const sortProductsBySimilarity = (
  products: Product[],
  currentProduct: Product | undefined,
): Product[] => {
  if (!currentProduct) {
    return [...products];
  }

  return [...products].sort((first, second) => {
    const firstScore = getSimilarityScore(first, currentProduct);
    const secondScore = getSimilarityScore(second, currentProduct);

    const firstPriceDifference = Math.abs(first.price - currentProduct.price);

    const secondPriceDifference = Math.abs(second.price - currentProduct.price);

    return (
      secondScore - firstScore || firstPriceDifference - secondPriceDifference
    );
  });
};
