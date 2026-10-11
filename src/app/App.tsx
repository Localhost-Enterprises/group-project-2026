import { Typography } from '@/components/atoms/Typography';

export const App = () => {
  return (
    <Typography
      as="h3"
      variant="button"
    >
      <Typography
        as="a"
        variant="h2"
      >
        Hello, world!
      </Typography>
    </Typography>
  );
};
