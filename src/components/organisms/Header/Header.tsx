import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { Logo } from '@/components/atoms/Logo';
import { CartIcon } from '@/components/atoms/Icons/CartIcon';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { MenuIcon } from '@/components/atoms/Icons/MenuIcon';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { SearchIcon } from '@/components/atoms/Icons/SearchIcon';
import { ROUTES } from '@/app/router';
import { routePaths } from '@/app/router/routes';
import { selectCartCount, useCartStore } from '@/entities/cart';
import classNames from 'classnames';
import { useFavouritesStore } from '@/entities/favourites';
import { SearchField } from '../SearchField';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const cartQuantity = useCartStore(selectCartCount);
  const location = useLocation();
  const previousFrom = location.state?.from;
  const cartFrom =
    location.pathname === ROUTES.CART && typeof previousFrom === 'string' ?
      previousFrom
    : `${location.pathname}${location.search}`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const favouritesCount = useFavouritesStore(
    (state) => state.favourites.length,
  );

  return (
    <header className={classNames(styles.header, className)}>
      <Link
        to={ROUTES.HOME}
        className={styles.logoLink}
      >
        <Logo size="small" />
      </Link>

      {/*Desktop*/}

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {[
            ROUTES.HOME,
            routePaths.catalog('phones'),
            routePaths.catalog('tablets'),
            routePaths.catalog('accessories'),
          ].map((path, idx) => {
            const labels = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];
            return (
              <li
                key={path}
                className={styles.navItem}
              >
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    cn(styles.navLink, { [styles.active]: isActive })
                  }
                >
                  {labels[idx]}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.headerActions}>
        <SearchField className={styles.desktopSearch} />
        <NavLink
          to={ROUTES.FAVOURITES}
          className={({ isActive }) =>
            cn(styles.actionBtn, { [styles.active]: isActive })
          }
        >
          <FavouritesIcon quantity={favouritesCount} />
        </NavLink>
        <NavLink
          to={ROUTES.CART}
          state={{ from: cartFrom }}
          className={({ isActive }) =>
            cn(styles.actionBtn, { [styles.active]: isActive })
          }
        >
          <CartIcon quantity={cartQuantity} />
        </NavLink>
      </div>

      <div className={styles.mobileSearch}>
        <button
          className={styles.mobileSearchButton}
          type="button"
          aria-label={isMobileSearchOpen ? 'Close search' : 'Open search'}
          aria-expanded={isMobileSearchOpen}
          onClick={() => setIsMobileSearchOpen((open) => !open)}
        >
          {isMobileSearchOpen ?
            <CloseIcon />
          : <SearchIcon />}
        </button>
        {isMobileSearchOpen && (
          <SearchField
            autoFocus
            className={styles.mobileSearchField}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setIsMobileSearchOpen(false);
              }
            }}
          />
        )}
      </div>

      <button
        className={styles.burgerBtn}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ?
          <CloseIcon />
        : <MenuIcon />}
      </button>

      {/*Mobile menu*/}

      <div className={cn(styles.mobileMenu, { [styles.open]: isMenuOpen })}>
        <ul className={styles.mobileNavList}>
          {[
            ROUTES.HOME,
            routePaths.catalog('phones'),
            routePaths.catalog('tablets'),
            routePaths.catalog('accessories'),
          ].map((path, idx) => {
            const labels = ['HOME', 'PHONES', 'TABLETS', 'ACCESSORIES'];
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  onClick={toggleMenu}
                  end={path === '/'}
                  className={({ isActive }) =>
                    cn(styles.mobileNavLink, { [styles.active]: isActive })
                  }
                >
                  {labels[idx]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className={styles.mobileActions}>
          <NavLink
            to={ROUTES.FAVOURITES}
            onClick={toggleMenu}
            className={({ isActive }) =>
              cn(styles.mobileActionBtn, { [styles.active]: isActive })
            }
          >
            <FavouritesIcon quantity={favouritesCount} />
          </NavLink>
          <NavLink
            to={ROUTES.CART}
            state={{ from: cartFrom }}
            onClick={toggleMenu}
            className={({ isActive }) =>
              cn(styles.mobileActionBtn, { [styles.active]: isActive })
            }
          >
            <CartIcon quantity={cartQuantity} />
          </NavLink>
        </div>
      </div>
    </header>
  );
};
