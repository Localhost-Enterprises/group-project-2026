import { NotFoundTemplate } from '@/components/templates/NotFoundTemplate';

import pageNotFoundImage from '/img/page-not-found.png';
import { useEffect } from 'react';

export const NotFoundPage = () => {
  useEffect(() => {
    document.title = `Page Not Found | NICE GADGETS`;
  }, []);

  return (
    <NotFoundTemplate
      title="Page Not Found"
      image={pageNotFoundImage}
    />
  );
};
