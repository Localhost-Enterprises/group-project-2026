import { IconWithCounter } from '../IconWithCounter';

export const FavouritesIcon = ({
  quantity,
  className,
}: {
  quantity?: number;
  className?: string;
}) => {
  return (
    <IconWithCounter
      icon="favourites"
      quantity={quantity}
      className={className}
    />
  );
};
