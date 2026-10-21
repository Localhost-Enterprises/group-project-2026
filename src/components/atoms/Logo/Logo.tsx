import classNames from 'classnames';
import styles from './Logo.module.scss';
import logo from '@/shared/assets/icons/Logo.svg';
import { ImageWithFallback } from '@/components/organisms';
import { placeholder } from '@/shared/constants';

type LogoSize = 'small' | 'big';

type Props = {
  size?: LogoSize;
  className?: string;
};

export const Logo = ({ size = 'small', className }: Props) => {
  return (
    <ImageWithFallback
      fallback={placeholder['500x250']}
      src={logo}
      className={classNames(styles.logo, styles[size], className)}
      alt="Logo"
    />
  );
};
