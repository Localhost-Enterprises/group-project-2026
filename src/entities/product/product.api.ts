import { supabase } from '@/shared/api/supabase';
import type { Product } from '@/shared/types';
import type { Category } from '@/shared/types/Category';

export const productApi = {
  getFullImageUrls: (item: Product): string[] => {
    const images = Array.isArray(item.images) ? item.images : [item.images];

    return images.map((imagePath) => {
      const { data } = supabase.storage.from('images').getPublicUrl(imagePath);

      return data.publicUrl;
    });
  },

  getAll: async (): Promise<Product[]> => {
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      throw error;
    }

    return data.map((item: Product) => ({
      ...item,
      imageUrls: productApi.getFullImageUrls(item),
    }));
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('itemId', slug)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data.map((item: Product) => ({
      ...item,
      imageUrls: productApi.getFullImageUrls(item),
    }));
  },

  getByCategory: async (categorySlug: Category): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', categorySlug);

    if (error) {
      throw error;
    }

    return data.map((item: Product) => ({
      ...item,
      imageUrls: productApi.getFullImageUrls(item),
    }));
  },

  getByIds: async (ids: number[]): Promise<Product[]> => {
    if (!ids.length) {
      return [];
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .in('id', ids);

    if (error) {
      throw error;
    }

    return data.map((item: Product) => ({
      ...item,
      imageUrls: productApi.getFullImageUrls(item),
    }));
  },
};
