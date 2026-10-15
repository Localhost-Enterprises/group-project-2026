import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { CatalogFilter } from '@/components/organisms/CatalogFilter';

export const CatalogPage = () => {
  return (
    <>
      <Breadcrumbs />

      <h1>Catalog Page</h1>

      <CatalogFilter />
    </>
  );
};
