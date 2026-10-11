import { Icon } from '../Icon';

import minusIcon from '@/shared/assets/icons/Minus.svg?no-inline';

export const MinusIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={minusIcon}
      className={className}
    />
  );
};
