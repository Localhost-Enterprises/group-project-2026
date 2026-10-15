import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { CatalogFilter } from '@/components/organisms/CatalogFilter';
import { useEffect, useState } from 'react';
import { GetData } from '@/shared/api/GetData';
import type { Product } from '@/shared/types/Product';
import { useLocation } from 'react-router-dom';
import { CatalogTemplate } from '@/components/templates/CatalogTemplate/CatalogTemplate';

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
    </>
  );
  return <CatalogTemplate data={{ items, title }} />;
};
