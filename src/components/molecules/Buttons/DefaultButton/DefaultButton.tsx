import classNames from 'classnames';
import styles from './DefaultButton.module.scss';

export const DefaultButton = ({
  className,
  children,
  ...props
}: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(styles.button, className)}
    >
      {children}
    </button>
  );
};
