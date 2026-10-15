import { routePaths } from '@/app/router/routes';
import { Typography } from '@/components/atoms/Typography';
import type { Category } from '@/shared/types/Category';
import { Link } from 'react-router-dom';

type Props = {
  category: Category;
  itemId: string;
  className?: string;
  children: React.ReactNode;
};

export const ProductLink = ({
  category,
  itemId,
  className,
  children,
}: Props) => {
  return (
    <Link to={routePaths.product(category, itemId)}>
      <Typography
        variant="bodytext"
        as="h3"
        className={className}
      >
        {children}
      </Typography>
    </Link>
  );
};
