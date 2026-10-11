import { Icon } from '../Icon';

import closeIcon from '@/shared/assets/icons/Close.svg?no-inline';

export const CloseIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={closeIcon}
      className={className}
    />
  );
};
