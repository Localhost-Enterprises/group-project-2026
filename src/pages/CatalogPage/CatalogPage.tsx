import { useEffect, useState } from 'react';
import { GetData } from '@/shared/api/GetData';
import type { Product } from '@/shared/types/Product';
import { useLocation } from 'react-router-dom';
import { CatalogTemplate } from '@/components/templates/CatalogTemplate/CatalogTemplate';
import { NotFoundPage } from '../NotFoundPage';
import { Category } from '@/shared/types/Category';

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
  | 'category'
> & {
  fullImageUrls: string[];
  category: string;
};

export const CatalogPage = () => {
  const [items, setItems] = useState<Props[]>([]);
  const { pathname } = useLocation();

  const parts = pathname.split('/');
  const title = parts[parts.length - 1];

  useEffect(() => {
    GetData('products').then((data) => {
      const filtered = (data as Props[]).filter(
        (item) => item.category === title,
      );
      setItems(filtered);
    });
  }, [title]);

  const isValidCategory = Object.values(Category).some(
    (category) => category === title,
  );

  useEffect(() => {
    if (!isValidCategory) return;

    GetData('products').then((data) => {
      const filtered = (data as Props[]).filter(
        (item) => item.category === title,
      );

      setItems(filtered);
    });
  }, [title, isValidCategory]);

  // Неизвестная категория → 404
  if (!isValidCategory) {
    return <NotFoundPage />;
  }

  return <CatalogTemplate data={{ items, title }} />;
};
