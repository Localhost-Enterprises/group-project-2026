import { Footer, Header } from '@/components';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
