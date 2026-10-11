import { IconWithCounter } from '../IconWithCounter';

export const CartIcon = ({
  quantity,
  className,
}: {
  quantity?: number;
  className?: string;
}) => {
  return (
    <IconWithCounter
      icon="cart"
      quantity={quantity}
      className={className}
    />
  );
};
