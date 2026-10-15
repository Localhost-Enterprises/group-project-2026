import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Product } from '@/shared/types/Product';
import { productApi } from '@/entities/product/product.api';
import { CatalogTemplate } from '@/components/templates/CatalogTemplate/CatalogTemplate';
import type { Category } from '@/shared/types/Category';

type Props = Pick<
  Product,
  | 'id'
  | 'name'
  | 'images'
  | 'price'
  | 'fullPrice'
  | 'screen'
  | 'capacity'
  | 'ram'
  | 'item_id'
> & {
  fullImageUrls: string[];
  category: Category;
};

export const CatalogPage = () => {
  const [items, setItems] = useState<Props[]>([]);
  const { pathname } = useLocation();
  const parts = pathname.split('/');
  const title = parts[parts.length - 1];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productApi.getByCategory(title as Category);

        const items: Props[] = data.map((item) => ({
          ...item,
          fullImageUrls: item.imageUrls ?? [],
        }));

        setItems(items);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, [title]);

  return <CatalogTemplate data={{ items, title }} />;
};
