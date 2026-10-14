import { NavLink, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.scss';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import cn from 'classnames';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const parts = pathname.split('/');
  parts.shift();

  if (parts[parts.length - 1] === '') {
    parts.pop();
  }

  const hasCatalog = parts[0] === 'catalog';

  if (hasCatalog) {
    parts.shift();
  }

  return (
    parts.length > 0 &&
    parts[0] !== 'cart' && (
      <div className={styles.breadcrumb}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            cn(styles.itemLink, { [styles.active]: isActive })
          }
        >
          <HomeIcon />
        </NavLink>

        {parts.map((part, index) => {
          const routeParts =
            hasCatalog ?
              ['catalog', ...parts.slice(0, index + 1)]
            : parts.slice(0, index + 1);

          const routeTo = `/${routeParts.join('/')}`;

          const isLast = index === parts.length - 1;

          return (
            <Fragment key={routeTo}>
              <ArrowIcon direction="right" />

              <NavLink
                to={routeTo}
                className={() =>
                  cn(styles.itemLink, { [styles.active]: isLast })
                }
              >
                {part}
              </NavLink>
            </Fragment>
          );
        })}
      </div>
    )
  );
};
