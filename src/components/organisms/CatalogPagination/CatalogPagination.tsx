import { ArrowButton } from '@/components/molecules';
import styles from './CatalogPagination.module.scss';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const CatalogPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  return (
    <div className={styles.container}>
      <ArrowButton
        direction="left"
        className={styles.page}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <button
            key={page}
            className={`${styles.page} ${
              currentPage === page ? styles.active : ''
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ),
      )}

      <ArrowButton
        direction="right"
        className={styles.page}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
};
