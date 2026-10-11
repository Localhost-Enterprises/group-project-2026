import { Icon } from '../Icon';

import menuIcon from '@/shared/assets/icons/Menu.svg?no-inline';

export const MenuIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={menuIcon}
      className={className}
    />
  );
};
