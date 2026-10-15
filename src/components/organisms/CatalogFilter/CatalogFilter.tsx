import { Dropdown } from '@/components/molecules';
import { useSearchParams } from 'react-router-dom';
import {
  CATALOG_PAGE_SIZE_OPTIONS,
  CATALOG_SORT_OPTIONS,
} from './CatalogFilter.constants';
import styles from './CatalogFilter.module.scss';

export const CatalogFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy =
    CATALOG_SORT_OPTIONS.find(
      (option) => option === searchParams.get('sort'),
    ) ?? CATALOG_SORT_OPTIONS[0];
  const itemsPerPage =
    CATALOG_PAGE_SIZE_OPTIONS.find(
      (option) => option === searchParams.get('perPage'),
    ) ?? CATALOG_PAGE_SIZE_OPTIONS[0];

  const updateSearchParam = (key: string, value: string) => {
    setSearchParams((currentParams) => {
      const nextParams = new URLSearchParams(currentParams);
      nextParams.set(key, value);

      return nextParams;
    });
  };

  return (
    <div className={styles.container}>
      <Dropdown
        className={styles.sortBy}
        options={[...CATALOG_SORT_OPTIONS]}
        description="Sort by"
        value={sortBy}
        onChange={(value) => updateSearchParam('sort', value)}
      />

      <Dropdown
        className={styles.itemsOnPage}
        options={[...CATALOG_PAGE_SIZE_OPTIONS]}
        description="Items on page"
        value={itemsPerPage}
        onChange={(value) => updateSearchParam('perPage', value)}
      />
    </div>
  );
};
