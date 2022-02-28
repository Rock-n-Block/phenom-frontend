import { FormEvent, ReactElement, useCallback, useState, VFC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface IDefaultInput {
  name: string;
  value: string;
  setValue: (value: string) => void;
  subInfo?: string | ReactElement;
  maxSubInfoWidth?: string | ReactElement;
  placeholder?: string;
  error?: string;
  label?: string | ReactElement;
  className?: string;
  disabled?: boolean;
}

const DefaultInput: VFC<IDefaultInput> = ({
  name,
  value,
  setValue,
  label,
  placeholder,
  subInfo,
  maxSubInfoWidth = '150px',
  error,
  className,
  disabled = false,
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
    <div
      className={cn(styles['default-input__body'], { [styles['invalid-field']]: error }, className)}
    >
      {label && (
        <label
          htmlFor={`default_input_${name}`}
          className={cn(styles['default-input__body-label'], { [styles['show-label']]: label })}
        >
          {label}
        </label>
      )}
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
          disabled={disabled}
        />
        {subInfo && (
          <div
            className={cn(styles['default-input__body-input__sub-info'], {
              [styles['sub-info-active']]: subInfo,
            })}
            style={{ maxWidth: subInfo ? `clamp(30px, 100%, ${maxSubInfoWidth})` : '0' }}
          >
            {subInfo}
          </div>
        )}
      </div>
      {error && <p className={styles['default-input__body-error']}>{error}</p>}
    </div>
  );
};

export default DefaultInput;
