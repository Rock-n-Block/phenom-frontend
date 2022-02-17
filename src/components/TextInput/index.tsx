import cx from 'classnames';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  icon?: any;
  onChange?: (value: any) => void;
  value?: string;
}

const TextInput: React.FC<Props> = ({
  className,
  placeholder,
  icon,
  onChange,
  value
  // ...props
}) => {
  return (
    <div className={cx(styles.field, className)}>
      {icon && <img src={icon} alt="icon" className={styles.icon} />}
      <input
        onChange={onChange}
        className={cx(styles.input, { [styles.withIcon]: icon })}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default TextInput;
