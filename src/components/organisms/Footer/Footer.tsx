import React from 'react';
import styles from './Footer.module.scss';
//import { NavLink } from 'react-router';
import { Logo } from '../../atoms/Logo/Logo';
import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.footer__logo}>
        <Logo size="big" />
      </div>
      <div className={styles.footer__menu}>
        {/* <NavLink to='#'> */}
        <Typography
          className={styles.footer__typo}
          variant="uppercase"
        >
          GITHUB
        </Typography>
        {/* </NavLink> */}

        {/* <NavLink to='#'> */}
        <Typography
          className={styles.footer__typo}
          variant="uppercase"
        >
          CONTACTS
        </Typography>
        {/* </NavLink> */}

        {/* <NavLink to='#'> */}
        <Typography
          className={styles.footer__typo}
          variant="uppercase"
        >
          RIGHTS
        </Typography>
        {/* </NavLink> */}
      </div>
      <div
        className={styles.footer__button_top}
        onClick={scrollToTop}
      >
        <Typography
          className={styles.footer__typo}
          variant="smalltext"
        >
          Back to top
        </Typography>
        <ArrowButton direction="up" />
      </div>
    </div>
  );
};
