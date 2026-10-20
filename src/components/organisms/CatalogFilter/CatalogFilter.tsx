import { Dropdown } from '@/components/molecules';
import { useSearchParams } from 'react-router-dom';
import {
  CATALOG_PAGE_SIZE_OPTIONS,
  CATALOG_SORT_OPTIONS,
} from './CatalogFilter.constants';
import styles from './CatalogFilter.module.scss';
import { useTranslation } from 'react-i18next';

export const CatalogFilter = () => {
  const { t } = useTranslation();

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
        optionLabels={{
          'Newest': t('sortNewest'),
          'Cheapest': t('sortCheapest'),
          'Most expensive': t('sortMostExpensive'),
        }}
        description={t('sortBy')}
        value={sortBy}
        onChange={(value) => updateSearchParam('sort', value)}
      />

      <Dropdown
        className={styles.itemsOnPage}
        options={[...CATALOG_PAGE_SIZE_OPTIONS]}
        description={t('itemsOnPage')}
        value={itemsPerPage}
        onChange={(value) => updateSearchParam('perPage', value)}
      />
    </div>
  );
};
