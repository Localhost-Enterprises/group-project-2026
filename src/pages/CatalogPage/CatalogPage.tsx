import { useEffect, useMemo, useState } from 'react';
import { GetData } from '@/shared/api/GetData';
import type { Product } from '@/shared/types/Product';
import { useLocation, useSearchParams } from 'react-router-dom';
import { CatalogTemplate } from '@/components/templates/CatalogTemplate/CatalogTemplate';
import { CATALOG_SORT_OPTIONS } from '@/components/organisms/CatalogFilter/CatalogFilter.constants';

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
  | 'year'
  | 'item_id'
  | 'category'
> & {
  fullImageUrls: string[];
  category: string;
};

export const CatalogPage = () => {
  const [items, setItems] = useState<Props[]>([]);
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const parts = pathname.split('/');
  const title = parts[parts.length - 1];
  const sortBy =
    CATALOG_SORT_OPTIONS.find(
      (option) => option === searchParams.get('sort'),
    ) ?? CATALOG_SORT_OPTIONS[0];

  const sortedItems = useMemo(() => {
    return [...items].sort((first, second) => {
      switch (sortBy) {
        case 'Cheapest':
          return first.price - second.price;
        case 'Most expensive':
          return second.price - first.price;
        case 'Newest':
          return second.year - first.year;
      }
    });
  }, [items, sortBy]);

  useEffect(() => {
    GetData('products').then((data) => {
      const filtered = (data as Props[]).filter(
        (item) => item.category === title,
      );
      setItems(filtered);
    });
  }, [title]);

  return <CatalogTemplate data={{ items: sortedItems, title }} />;
};
