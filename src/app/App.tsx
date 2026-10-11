import { ArrowIcon } from '@/components/atoms/Icons/ArrowIcon';
import { CartIcon } from '@/components/atoms/Icons/CartIcon';
import { CloseIcon } from '@/components/atoms/Icons/CloseIcon';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon';
import { HomeIcon } from '@/components/atoms/Icons/HomeIcon';
import { MenuIcon } from '@/components/atoms/Icons/MenuIcon';
import { MinusIcon } from '@/components/atoms/Icons/MinusIcon';
import { PlusIcon } from '@/components/atoms/Icons/PlusIcon';
import { SearchIcon } from '@/components/atoms/Icons/SearchIcon';

import { Logo } from '@/components/atoms/Logo';
import { Typography } from '@/components/atoms/Typography';

export const App = () => {
  return (
    <>
      <Typography
        as="h3"
        variant="button"
      >
        <Typography
          as="a"
          variant="h2"
        >
          Hello, world!
        </Typography>
      </Typography>

      <Logo />

      <div
        style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FavouritesIcon quantity={10} />
        <FavouritesIcon filled />
        <CartIcon />
        <CartIcon quantity={105} />
        <HomeIcon />
        <SearchIcon />
        <PlusIcon />
        <MinusIcon />
        <CloseIcon />
        <MenuIcon />
        <ArrowIcon direction="left" />
        <ArrowIcon
          direction="down"
          black
        />
        <ArrowIcon direction="up" />
        <ArrowIcon
          direction="right"
          black
        />
      </div>
    </>
  );
};
