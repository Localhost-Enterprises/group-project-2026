import { NavLink, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import styles from './Breadcrumbs.module.scss';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import cn from 'classnames';
import classNames from 'classnames';
import { Category } from '@/shared/types/Category';

type Props = {
  className?: string;
};

export const Breadcrumbs = ({ className }: Props) => {
  const location = useLocation();
  const { pathname } = location;

  let parts = pathname.split('/');
  parts.shift();

  if (parts[parts.length - 1] === '') {
    parts.pop();
  }

  if (pathname === '/cart') {
    const from = location.state?.from;
    const sourceParts =
      typeof from === 'string' ? from.split('/').filter(Boolean) : [];
    const sourceCategory =
      sourceParts[0] === 'catalog' ? sourceParts[1] : sourceParts[0];
    const hasSourceCategory = Object.values(Category).some(
      (category) => category === sourceCategory,
    );

    parts = hasSourceCategory ? [sourceCategory, 'cart'] : ['cart'];
  }

  const hasCatalog = parts[0] === 'catalog';

  if (hasCatalog) {
    parts.shift();
  }

  return (
    parts.length > 0 && (
      <div className={classNames(styles.breadcrumb, className)}>
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
                {part[0].toUpperCase() + part.slice(1)}
              </NavLink>
            </Fragment>
          );
        })}
      </div>
    )
  );
};
