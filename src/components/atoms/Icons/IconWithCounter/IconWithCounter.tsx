import classNames from 'classnames';
import styles from './IconWithCounter.module.scss';

import cartIcon from '@/shared/assets/icons/Cart.svg?no-inline';
import cartIconWithCounter from '@/shared/assets/icons/CartWithCounter.svg?no-inline';

import favouritesIcon from '@/shared/assets/icons/Favourites.svg?no-inline';
import favouritesIconWithCounter from '@/shared/assets/icons/FavouritesWithCounter.svg?no-inline';

const icons = {
  cart: {
    without: cartIcon,
    with: cartIconWithCounter,
  },

  favourites: {
    without: favouritesIcon,
    with: favouritesIconWithCounter,
  },
};

export const IconWithCounter = ({
  icon,
  quantity = 0,
  className,
}: {
  icon: keyof typeof icons;
  quantity?: number;
  className?: string;
}) => {
  return (
    <div
      className={classNames(styles.icon, className, {
        [styles.counter]: quantity > 0,
      })}
      style={
        {
          '--quantity': `"${quantity > 99 ? 99 : quantity}"`,
          '--icon': `url(${icons[icon].without})`,
          '--iconWithCounter': `url(${icons[icon].with})`,
        } as React.CSSProperties
      }
    ></div>
  );
};
