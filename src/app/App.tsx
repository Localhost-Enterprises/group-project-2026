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
import {
  ArrowButton,
  BackButton,
  ColorButton,
  Dropdown,
  IconButton,
  OptionButton,
  TextButton,
} from '@/components/molecules';

export const App = () => {
  return (
    <div className="flex flex-col gap-2.5">
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

      <div className="flex gap-2.5 justify-center items-center">
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
      <div className="flex gap-2.5 justify-center items-center">
        <OptionButton>1</OptionButton>
        <OptionButton selected>2</OptionButton>
        <OptionButton className="w-20">256 GB</OptionButton>
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <ArrowButton direction="up" />
        <ArrowButton direction="left" />
        <ArrowButton
          direction="down"
          color="grey"
        />
        <ArrowButton
          direction="right"
          disabled
        />
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <IconButton
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
        />
        <IconButton
          iconInactive={<FavouritesIcon />}
          iconActive={<FavouritesIcon filled />}
          selected
        />
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <ColorButton color="#AA24DB" />
        <ColorButton
          color="#BDC323"
          selected
        />
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <TextButton className="w-40">Add to cart</TextButton>
        <TextButton
          selected
          className="w-40"
        >
          Remove from cart
        </TextButton>
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <BackButton direction="left">Back</BackButton>
        <BackButton
          direction="up"
          color="grey"
        >
          Up
        </BackButton>
      </div>
      <div className="flex gap-2.5 justify-center items-center">
        <Dropdown
          options={['iPhone', 'Bananas', 'Microdebagophonespon', 'Turbulence']}
          description="Description"
          className="w-2xs"
        />
      </div>
    </div>
  );
};
