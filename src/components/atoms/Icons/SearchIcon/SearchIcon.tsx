import { Icon } from '../Icon';

import searchIcon from '@/shared/assets/icons/Search.svg?no-inline';

export const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <Icon
      icon={searchIcon}
      className={className}
    />
  );
};
