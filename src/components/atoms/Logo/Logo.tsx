import classNames from 'classnames';
import styles from './Logo.module.scss';
import logo from '@/shared/assets/icons/Logo.svg';

type sizes = 'small' | 'big';

export const Logo = ({
  size = 'small',
  className,
}: {
  size?: sizes;
  className?: string;
}) => {
  return (
    <a
      className={classNames(styles.logoLink, styles[size], className)}
      href="/"
    >
      <img src={logo} />
    </a>
  );
};
