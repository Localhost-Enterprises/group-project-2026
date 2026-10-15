import { supabase } from './supabase';

export async function GetData(title: string) {
  const { data } = await supabase.from(title).select('*');

  if (!data) return [];

  return data.map((item) => {
    const images = Array.isArray(item.images) ? item.images : [item.images];
    const fullImageUrls = images.map(
      (imagePath: string) =>
        supabase.storage.from('images').getPublicUrl(imagePath).data.publicUrl,
    );

    return {
      ...item,
      fullImageUrls,
    };
  });
}
