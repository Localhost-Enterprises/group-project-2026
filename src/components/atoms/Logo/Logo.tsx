import classNames from 'classnames';
import styles from './Logo.module.scss';
import logo from '@/shared/assets/icons/Logo.svg';

type LogoSize = 'small' | 'big';

type Props = {
  size?: LogoSize;
  className?: string;
};

export const Logo = ({ size = 'small', className }: Props) => {
  return (
    <img
      src={logo}
      className={classNames(styles.logo, styles[size], className)}
      alt="Logo"
    />
  );
};
