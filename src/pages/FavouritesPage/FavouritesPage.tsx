import { FavouritesTemplate } from '@/components/templates/FavouritesTemplate';
import { useFavouritesStore } from '@/entities/favourites';
import { useProductByIds } from '@/entities/product';
import { useEffect, useMemo } from 'react';

export const FavouritesPage = () => {
  useEffect(() => {
    document.title = `Favourites | NICE GADGETS`;
  }, []);

  const savedFavourites = useFavouritesStore((state) => state.favourites);
  const favouriteIds = savedFavourites.map((product) => product.id);
  const {
    data: products = [],
    isPending,
    isError,
  } = useProductByIds(favouriteIds);

  const favourites = useMemo(() => {
    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );
    return savedFavourites
      .map((product) => productsById.get(product.id))
      .filter((product) => product !== undefined);
  }, [products, savedFavourites]);

  if (isError) {
    return <h2>Unable to load favourites</h2>;
  }

  return (
    <FavouritesTemplate
      data={favourites}
      count={savedFavourites.length}
      isLoading={favouriteIds.length > 0 && isPending}
    />
  );
};
