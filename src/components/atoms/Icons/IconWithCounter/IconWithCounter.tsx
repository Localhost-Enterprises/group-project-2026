import classNames from 'classnames';
import styles from './IconWithCounter.module.scss';

import { Icon } from '../Icon/Icon';

export const IconWithCounter = ({
  icon,
  quantity = 0,
  className,
}: {
  icon: string;
  quantity: number;
  className?: string;
}) => {
  const QuantityCSSVar = `"${quantity > 99 ? 99 : quantity}"`;

  return (
    <Icon
      icon={icon}
      className={classNames(styles.counter, className)}
      style={
        {
          '--quantity': QuantityCSSVar,
        } as React.CSSProperties
      }
    />
  );
};
