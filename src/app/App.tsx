import { CartIcon } from '@/components/atoms/Icons/CartIcon';
import { FavouritesIcon } from '@/components/atoms/Icons/FavouritesIcon/FavouritesIcon';
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

      <FavouritesIcon quantity={12} />
      <CartIcon quantity={150} />
    </>
  );
};
