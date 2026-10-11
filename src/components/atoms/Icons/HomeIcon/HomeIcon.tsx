import { Icon } from '../Icon';

import homeIcon from '@/shared/assets/icons/Home.svg?no-inline';

export const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={homeIcon}
      className={className}
    />
  );
};
