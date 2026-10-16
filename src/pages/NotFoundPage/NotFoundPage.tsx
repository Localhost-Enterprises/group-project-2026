import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import pageNotFoundImage from '/img/page-not-found.png';

export const NotFoundPage = () => {
  return (
    <NotFoundTemplate
      title="Page Not Found"
      image={pageNotFoundImage}
    />
  );
};
