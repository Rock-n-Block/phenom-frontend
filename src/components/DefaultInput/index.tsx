import { FormEvent, ReactElement, useCallback, useState, VFC } from 'react';

import cn from 'classnames';

import { checkMinMax, validateOnlyNumbers } from 'utils';

import styles from './styles.module.scss';

export interface IDefaultInput {
  name: string;
  value: string;
  setValue: (value: string) => void;
  subInfo?: string | ReactElement;
  maxSubInfoWidth?: string;
  placeholder?: string;
  error?: string;
  label?: string | ReactElement;
  className?: string;
  labelClassName?: string;
  onFocus?: (e: FormEvent<HTMLInputElement>) => void;
  onBlur?: (e: FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  type?: 'text' | 'number';
  min?: string | number;
  max?: string | number;
}

/**
 *
 * @param {string} name - uniq id of the component
 * @param {string} value - the value of the input
 * @param {(value: string) => void} setValue - callback function which will be called when input has been changed
 * @param {string | ReactElement} [subInfo] - element which will be placed at the right side of the input for further modifications
 * @param {string} [maxSubInfoWidth] - max width of the "subInfo"
 * @default maxSubInfoWidth = 150px
 * @param {string} [placeholder]
 * @param {error} [error] - error string
 * @param {string | ReactElement} [label] - label of the input
 * @param {string} [className] - input class name
 * @param {string} [labelClassName] - label class name
 * @param {(e: FormEvent<HTMLInputElement>) => void} [onFocus] - callback which will be called when input has focus
 * @param {(e: FormEvent<HTMLInputElement>) => void} [onBlur] - callback which will be called when input has lost focus
 * @param {boolean} [disabled]
 * @default disabled = false
 * @param {'text' | 'number'} [type] - type of the input
 * @default type = 'text'
 * @param {'string' | 'number' } [min] - minimal count of symbols
 * @param {'string' | 'number' } [max] - maximal count of symbols
 * @returns
 */

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
      onFocus?.(e);
    },
    [onFocus],
  );

  const onBlurHandler = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsActive(false);
      onBlur?.(e);
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
    }
    if (min || max) {
      if (!checkMinMax(String(currentValue.length), min, max)) {
        e.stopPropagation();
        return;
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
          autoComplete="off"
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
