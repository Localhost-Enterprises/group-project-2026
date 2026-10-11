import classNames from 'classnames';

import styles from './Icon.module.scss';

export const Icon = ({
  icon,
  className,
  style,
}: {
  icon: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const IconCSSVar = `url(${icon})`;

  return (
    <div
      className={classNames(styles.icon, className)}
      style={{ '--icon': IconCSSVar, ...style } as React.CSSProperties}
    ></div>
  );
};
