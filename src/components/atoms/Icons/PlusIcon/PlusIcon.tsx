import { Icon } from '../Icon';

import plusIcon from '@/shared/assets/icons/Plus.svg?no-inline';

export const PlusIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={plusIcon}
      className={className}
    />
  );
};
