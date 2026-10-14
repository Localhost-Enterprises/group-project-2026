import { Footer, Header } from '@/components/organisms';
import { Outlet } from 'react-router-dom';

import styles from './MainTemplate.module.scss';

export const MainTemplate = () => {
  return (
    <>
      <Header />

      <main className={styles.container}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
