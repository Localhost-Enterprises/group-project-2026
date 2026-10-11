import { Icon } from '../Icon';

import arrowUp from '@/shared/assets/icons/ArrowUp.svg?no-inline';
import arrowUpBlack from '@/shared/assets/icons/ArrowUpBlack.svg?no-inline';

import arrowDown from '@/shared/assets/icons/ArrowDown.svg?no-inline';
import arrowDownBlack from '@/shared/assets/icons/ArrowDownBlack.svg?no-inline';

import arrowLeft from '@/shared/assets/icons/ArrowLeft.svg?no-inline';
import arrowLeftBlack from '@/shared/assets/icons/ArrowLeftBlack.svg?no-inline';

import arrowRight from '@/shared/assets/icons/ArrowRight.svg?no-inline';
import arrowRightBlack from '@/shared/assets/icons/ArrowRightBlack.svg?no-inline';

export const ArrowIcon = ({
  direction,
  black,
  className,
}: {
  direction: 'up' | 'down' | 'left' | 'right';
  black?: boolean;
  className?: string;
}) => {
  switch (direction) {
    case 'up':
      if (black) {
        return (
          <Icon
            icon={arrowUpBlack}
            className={className}
          />
        );
      }
      return (
        <Icon
          icon={arrowUp}
          className={className}
        />
      );
    case 'down':
      if (black) {
        return (
          <Icon
            icon={arrowDownBlack}
            className={className}
          />
        );
      }
      return (
        <Icon
          icon={arrowDown}
          className={className}
        />
      );
    case 'left':
      if (black) {
        return (
          <Icon
            icon={arrowLeftBlack}
            className={className}
          />
        );
      }
      return (
        <Icon
          icon={arrowLeft}
          className={className}
        />
      );
    case 'right':
      if (black) {
        return (
          <Icon
            icon={arrowRightBlack}
            className={className}
          />
        );
      }
      return (
        <Icon
          icon={arrowRight}
          className={className}
        />
      );
  }
};
