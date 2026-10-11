import { Icon } from '../Icon';

import cartIcon from '@/shared/assets/icons/Cart.svg?no-inline';
import cartWithCounterIcon from '@/shared/assets/icons/CartWithCounter.svg?no-inline';

import { IconWithCounter } from '../IconWithCounter';

export const CartIcon = ({
  quantity = 0,
  className,
}: {
  quantity?: number;
  className?: string;
}) => {
  if (quantity > 0) {
    return (
      <IconWithCounter
        icon={cartWithCounterIcon}
        quantity={quantity}
        className={className}
      />
    );
  }

  return (
    <Icon
      icon={cartIcon}
      className={className}
    />
  );
};
