import { ROUTES } from '@/app/router';
import styles from './Footer.module.scss';
import { Logo } from '@/components/atoms/Logo';
import { Typography } from '@/components/atoms/Typography';
import { ArrowButton } from '@/components/molecules';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const menuItems = [
  {
    id: 'github',
    label: 'GITHUB',
    to: 'https://github.com/Localhost-Enterprises',
  },
  { id: 'contacts', label: 'CONTACTS', to: '#' },
  { id: 'rights', label: 'RIGHTS', to: '#' },
];

type Props = {
  className?: string;
};

export const Footer = ({ className }: Props) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <Link to={ROUTES.HOME}>
        <Logo
          size="big"
          className={styles.logo}
        />
      </Link>

      <div className={styles.menu}>
        {menuItems.map(({ id, label, to }) => (
          <a
            href={to}
            key={id}
          >
            <Typography
              className={styles.typo}
              variant="uppercase"
            >
              {label}
            </Typography>
          </a>
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
