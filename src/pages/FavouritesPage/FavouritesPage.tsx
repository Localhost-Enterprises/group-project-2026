import { FavouritesTemplate } from '@/components/templates/FavouritesTemplate';
import { useFavouritesStore } from '@/entities/favourites';
import { useEffect } from 'react';

export const FavouritesPage = () => {
  useEffect(() => {
    document.title = `Favourites | NICE GADGETS`;
  }, []);

  const favourites = useFavouritesStore((state) => state.favourites);

  return <FavouritesTemplate data={favourites} />;
};
