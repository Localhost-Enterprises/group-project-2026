import styles from './CartIcon.module.scss';
import classNames from 'classnames';

export const CartIcon = ({
  quantity = 0,
  className,
}: {
  quantity?: number;
  className?: string;
}) => {
  return (
    <div
      className={classNames(styles.icon, className, {
        [styles.counter]: quantity,
      })}
      style={
        {
          '--quantity': `"${quantity > 99 ? 99 : quantity}"`,
        } as React.CSSProperties
      }
    ></div>
  );
};
