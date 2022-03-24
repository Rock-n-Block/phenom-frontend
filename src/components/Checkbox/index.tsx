import { FC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ICheckboxProps {
  className?: string;
  content?: string;
  value: boolean;
  onChange?: any;
  id?: string;
  disabled?: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  className,
  disabled,
  content,
  value,
  onChange,
  id = '',
}): JSX.Element => {
  return (
    <label
      htmlFor={`toogle_${content}-${id}`}
      className={cn(styles.checkbox, className, { [styles.disabled]: disabled })}
    >
      <input
        id={`toogle_${content}-${id}`}
        className={styles.input}
        type="checkbox"
        onChange={onChange}
        checked={value}
        disabled={disabled}
      />
      <span className={styles.inner}>
        <span className={styles.tick} />
        <span className={styles.text}>{content}</span>
      </span>
    </label>
  );
};

export default Checkbox;
