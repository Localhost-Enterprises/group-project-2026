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

  return (
    parts.length > 0 && (
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
          const routeTo = `/${parts.slice(0, index + 1).join('/')}`;

          const isLast = index === parts.length - 1;

          return (
            <Fragment key={routeTo}>
              <ArrowIcon
                direction="right"
                className={styles.itemLink}
              />

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
