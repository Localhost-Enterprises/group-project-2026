import { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CatalogTemplate } from '@/components/templates/CatalogTemplate/CatalogTemplate';
import { NotFoundPage } from '../NotFoundPage';
import { useProducts } from '@/entities/product/model/product.queries';
import { Category } from '@/shared/types/Category';
import { CATALOG_SORT_OPTIONS } from '@/components/organisms/CatalogFilter/CatalogFilter.constants';

export const CatalogPage = () => {
  const { catalogSlug } = useParams<'catalogSlug'>();
  const [searchParams] = useSearchParams();

  const title = catalogSlug || '';

  const { data: products, isPending, isError } = useProducts();

  const isValidCategory = Object.values(Category).some(
    (category) => category === title,
  );

  const items = useMemo(() => {
    return (products ?? []).filter((item) => item.category === title);
  }, [products, title]);

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
        default:
          return 0;
      }
    });
  }, [items, sortBy]);

  if (!isValidCategory) {
    return <NotFoundPage />;
  }

  if (isPending) {
    return <h2>Loading products</h2>;
  }

  if (isError) {
    return <h2>Product error</h2>;
  }

  return <CatalogTemplate data={{ items: sortedItems, title }} />;
};
