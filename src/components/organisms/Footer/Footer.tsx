import styles from './Footer.module.scss';
//import { NavLink } from 'react-router';
import { Logo } from '@/components/atoms/Logo';
import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';

const menuItems = [
  { id: 'github', label: 'GITHUB', to: '#' },
  { id: 'contacts', label: 'CONTACTS', to: '#' },
  { id: 'rights', label: 'RIGHTS', to: '#' },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      {/* <Navlink to='#'> */}
      <div className={styles.logo}>
        <Logo size="big" />
      </div>
      {/* </Navlink> */}

      <div className={styles.menu}>
        {menuItems.map(({ id, label }) => (
          <>
            {' '}
            {/* <NavLink to={to}> */}
            <Typography
              key={id}
              className={styles.typo}
              variant="uppercase"
            >
              {label}
            </Typography>
          </>
        ))}
      </div>

      <div
        className={styles.button_top}
        onClick={scrollToTop}
      >
        <Typography
          className={styles.typo}
          variant="smalltext"
        >
          Back to top
        </Typography>
        <ArrowButton
          className={styles.arrowbutton}
          direction="up"
        />
      </div>
    </div>
  );
};
