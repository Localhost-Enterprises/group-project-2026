import { Footer, Header } from '@/components/organisms';
import { Outlet } from 'react-router-dom';

import styles from './MainTemplate.module.scss';

export const MainTemplate = () => {
  return (
    <div className={styles.container}>
      <Header className={styles.header} />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};
