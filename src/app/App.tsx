import { Footer, Header } from '@/components';
import styles from './App.module.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
