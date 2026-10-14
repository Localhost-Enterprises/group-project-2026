import { supabase } from '@/shared/api/supabase';
import type { Product } from '@/shared/types';
import type { Category } from '@/shared/types/Category';

const productTypeStringified =
  'id, category, itemId, name, fullPrice, price, screen, capacity, color, ram, year, image';

export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select(productTypeStringified);

    if (error) {
      throw error;
    }

    return data;
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from('products')
      .select(productTypeStringified)
      .eq('itemId', slug)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  },

  getByCategory: async (categorySlug: Category): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select(productTypeStringified)
      .eq('category', categorySlug);

    if (error) {
      throw error;
    }

    return data;
  },

  getByIds: async (ids: number[]): Promise<Product[]> => {
    if (!ids.length) {
      return [];
    }

    const { data, error } = await supabase
      .from('products')
      .select(productTypeStringified)
      .in('id', ids);

    if (error) {
      throw error;
    }

    return data;
  },
};
