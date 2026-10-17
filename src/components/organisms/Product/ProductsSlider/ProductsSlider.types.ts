import type { Product } from '@/shared/types';

export type ProductsSlidesData = {
  sectionTitle: string;
  productCards: Product[];
  isLoading?: boolean;
};
