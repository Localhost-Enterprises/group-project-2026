import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').slice(1);

  return (
    parts.length > 0 && (
      <div className={styles.breadcrumb}>
        <Link
          to="/"
          className={styles.logoLink}
        >
          <HomeIcon />
        </Link>
        <Link to="/">{parts[0]}</Link>
      </div>
    )
  );
};
