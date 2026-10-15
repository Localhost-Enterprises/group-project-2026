import { supabase } from '@/shared/api/supabase';

import type { Product } from '@/shared/types';
import type { Category } from '@/shared/types/Category';
import type { ProductDetailsByCategory } from '@/shared/types/ProductDetailsMap';
import type { WithImageUrls } from '@/shared/types/WithImageUrls';

type WithImages = {
  images: string | string[];
};

const getFullImageUrls = (item: WithImages): string[] => {
  const images = Array.isArray(item.images) ? item.images : [item.images];

  return images.map((imagePath) => {
    const { data } = supabase.storage.from('images').getPublicUrl(imagePath);

    return data.publicUrl;
  });
};

const withImageUrls = <T extends WithImages>(item: T): WithImageUrls<T> => ({
  ...item,
  imageUrls: getFullImageUrls(item),
});

export const productApi = {
  getFullImageUrls,

  getAll: async (): Promise<WithImageUrls<Product>[]> => {
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw error;

    return (data as Product[]).map(withImageUrls);
  },

  getBySlug: async (slug: string): Promise<WithImageUrls<Product> | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('item_id', slug)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    return withImageUrls(data as Product);
  },

  getByCategory: async (
    categorySlug: Category,
  ): Promise<WithImageUrls<Product>[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categorySlug);

    if (error) throw error;

    return (data as Product[]).map(withImageUrls);
  },

  getByIds: async (ids: number[]): Promise<WithImageUrls<Product>[]> => {
    if (!ids.length) return [];

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', ids);

    if (error) throw error;

    return (data as Product[]).map(withImageUrls);
  },

  getByIdInCategory: async <T extends Category>(
    table: T,
    id: string,
  ): Promise<WithImageUrls<ProductDetailsByCategory<T>> | null> => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const product = {
      ...data,
      category: table,
    } as ProductDetailsByCategory<T>;

    return withImageUrls(product);
  },

  getAllByCategory: async <T extends Category>(
    table: T,
  ): Promise<WithImageUrls<ProductDetailsByCategory<T>>[]> => {
    const { data, error } = await supabase.from(table).select('*');

    if (error) throw error;

    return data.map((item) => {
      const product = {
        ...item,
        category: table,
      } as ProductDetailsByCategory<T>;

      return withImageUrls(product);
    });
  },

  getByVariant: async <T extends Category>(
    table: T,
    namespace_id: string,
    color: string,
    capacity: string,
  ): Promise<WithImageUrls<ProductDetailsByCategory<T>> | null> => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('namespace_id', namespace_id)
      .eq('color', color)
      .eq('capacity', capacity)
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const product = {
      ...data,
      category: table,
    } as ProductDetailsByCategory<T>;

    return withImageUrls(product);
  },
};
