import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './Header.module.scss';
import { Logo } from '@/components/atoms/Logo';
import { CartIcon } from '@/components/atoms/Icons/CartIcon';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { MenuIcon } from '@/components/atoms/Icons/MenuIcon';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { ROUTES } from '@/app/router';
import { routePaths } from '@/app/router/routes';
import { selectCartCount, useCartStore } from '@/entities/cart';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartQuantity = useCartStore(selectCartCount);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
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
        <NavLink
          to={ROUTES.FAVOURITES}
          className={({ isActive }) =>
            cn(styles.actionBtn, { [styles.active]: isActive })
          }
        >
          <FavouritesIcon />
        </NavLink>
        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) =>
            cn(styles.actionBtn, { [styles.active]: isActive })
          }
        >
          <CartIcon quantity={cartQuantity} />
        </NavLink>
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
            `${ROUTES.CATALOG}/phones`,
            `${ROUTES.CATALOG}/tablets`,
            `${ROUTES.CATALOG}/accessories`,
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
            to="/favorites"
            onClick={toggleMenu}
            className={({ isActive }) =>
              cn(styles.mobileActionBtn, { [styles.active]: isActive })
            }
          >
            <FavouritesIcon />
          </NavLink>
          <NavLink
            to={ROUTES.CART}
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
