import { FormEvent, ReactElement, useCallback, useState, VFC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface IDefaultInput {
  name: string;
  value: string;
  setValue: (value: string) => void;
  subInfo?: string | ReactElement;
  placeholder?: string;
  error?: string;
  label?: string | ReactElement;
}

const DefaultInput: VFC<IDefaultInput> = ({
  name,
  value,
  setValue,
  label,
  placeholder,
  subInfo,
  error,
}) => {
  const [isActive, setIsActive] = useState(false);

  const onFocusHandler = useCallback(() => {
    setIsActive(true);
  }, []);

  const onBlurHandler = useCallback(() => {
    setIsActive(false);
  }, []);

  const onFieldChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      setValue(currentValue);
      e.stopPropagation();
    },
    [setValue],
  );

  return (
    <div className={cn(styles['default-input__body'], { [styles['invalid-field']]: error })}>
      <label
        htmlFor={`default_input_${name}`}
        className={cn(styles['default-input__body-label'], { [styles['show-label']]: label })}
      >
        {label}
      </label>
      <div
        className={cn(styles['default-input__body-input-container'], {
          [styles['input-focus']]: isActive,
        })}
      >
        <input
          className={styles['default-input__body-input']}
          value={value}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onFieldChange}
          placeholder={placeholder}
          type="text"
          id={`default_input_${name}`}
        />
        <div
          className={cn(styles['default-input__body-input__sub-info'], {
            [styles['sub-info-active']]: subInfo,
          })}
        >
          {subInfo}
        </div>
      </div>
      <p className={styles['default-input__body-error']}>{error}</p>
    </div>
  );
};

export default DefaultInput;
