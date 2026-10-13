import styles from './Footer.module.scss';
import { Logo } from '@/components/atoms/Logo';
import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';
import { Link } from 'react-router-dom';

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
      <Link to="#">
        <Logo
          size="big"
          className={styles.logo}
        />
      </Link>

      <div className={styles.menu}>
        {menuItems.map(({ id, label, to }) => (
          <Link
            to={to}
            key={id}
          >
            <Typography
              className={styles.typo}
              variant="uppercase"
            >
              {label}
            </Typography>
          </Link>
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
