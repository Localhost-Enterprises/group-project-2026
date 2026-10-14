import { useQuery } from '@tanstack/react-query';
import { productApi } from '../product.api';
import type { Category } from '@/shared/types/Category';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAll,
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => productApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
};

export const useProductByCategory = (slug: Category) => {
  return useQuery({
    queryKey: ['product', 'category', slug],
    queryFn: () => productApi.getByCategory(slug),
    enabled: Boolean(slug),
  });
};

export const useProductByIds = (ids: number[]) => {
  const sortedIds = [...new Set(ids)].sort((first, second) => first - second);

  return useQuery({
    queryKey: ['product', 'by-ids', sortedIds],
    queryFn: () => productApi.getByIds(sortedIds),
    enabled: sortedIds.length > 0,
  });
};
