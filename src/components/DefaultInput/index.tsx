import { FormEvent, ReactElement, useCallback, useState, VFC } from 'react';

import cn from 'classnames';

import { checkMinMax, validateOnlyNumbers } from 'utils';

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
  labelClassName?: string;
  onFocus?: (...args: any) => void;
  onBlur?: (...args: any) => void;
  disabled?: boolean;
  type?: 'text' | 'number';
  min?: string | number;
  max?: string | number;
}

const DefaultInput: VFC<IDefaultInput> = ({
  name,
  value,
  setValue,
  label,
  labelClassName,
  placeholder,
  subInfo,
  maxSubInfoWidth = '150px',
  error,
  className,
  onBlur,
  onFocus,
  disabled = false,
  type = 'text',
  min,
  max,
}) => {
  const [isActive, setIsActive] = useState(false);

  const onFocusHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsActive(true);
      onFocus?.();
    },
    [onFocus],
  );

  const onBlurHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsActive(false);
      onBlur?.();
    },
    [onBlur],
  );

  const onFieldChange = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentValue = e.currentTarget.value;
    if (type === 'number') {
      if (!validateOnlyNumbers(currentValue)) {
        e.stopPropagation();
        return;
      }
      if (min || max) {
        if (!checkMinMax(currentValue, min, max)) {
          e.stopPropagation();
          return;
        }
      }
    }
    setValue(currentValue);
    e.stopPropagation();
  };

  return (
    <div
      className={cn(styles['default-input__body'], { [styles['invalid-field']]: error }, className)}
    >
      {label && (
        <label
          htmlFor={`default_input_${name}`}
          className={cn(styles['default-input__body-label'], labelClassName, {
            [styles['show-label']]: label,
          })}
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
            style={{ width: subInfo ? `clamp(30px, 100%, ${maxSubInfoWidth})` : '0' }}
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
