import { NavLink } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';
import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import classNames from 'classnames';
import React from 'react';

type Props = {
  parts: string[];
  className?: string;
};

export const Breadcrumbs = ({ parts, className }: Props) => {
  const formattedParts = parts.map(
    (part) => part[0].toUpperCase() + part.slice(1),
  );
  return (
    parts.length > 0 && (
      <div className={classNames(styles.breadcrumb, className)}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            classNames(styles.itemLink, { [styles.active]: isActive })
          }
        >
          <HomeIcon />
        </NavLink>

        {formattedParts.map((part, index) => {
          const isLast = index === parts.length - 1;
          const routeTo = isLast ? '' : `/${part}`;

          return (
            <React.Fragment key={routeTo}>
              <ArrowIcon direction="right" />

              <NavLink
                to={routeTo.toLowerCase()}
                className={() =>
                  classNames(styles.itemLink, { [styles.active]: isLast })
                }
              >
                {part}
              </NavLink>
            </React.Fragment>
          );
        })}
      </div>
    )
  );
};
