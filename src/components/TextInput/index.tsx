import cx from 'classnames';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  icon?: any;
}

const TextInput: React.FC<Props> = ({
  className,
  placeholder,
  icon,
  // ...props
}) => {
  return (
    <div className={cx(styles.field, className)}>
      {icon && <img src={icon} alt="icon" className={styles.icon} />}
      <input className={cx(styles.input, { [styles.withIcon]: icon })} placeholder={placeholder} />
    </div>
  );
};

export default TextInput;
