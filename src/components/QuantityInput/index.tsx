import { ReactElement, useCallback, VFC } from 'react';

import { DefaultInput } from 'components';

import { AddSVG, RemoveSVG } from 'assets/img';

import styles from './styles.module.scss';

interface IQuantityOption {
  type: 'add' | 'remove';
  onClick: () => void;
}

const QuantityOption: VFC<IQuantityOption> = ({ type, onClick }) => {
  return (
    <button className={styles['add-remove-button']} type="button" onClick={onClick}>
      {type === 'add' ? <AddSVG /> : <RemoveSVG />}
    </button>
  );
};

interface IQuantityButtons {
  onAdd: () => void;
  onRemove: () => void;
}

const QuantityButtons: VFC<IQuantityButtons> = ({ onAdd, onRemove }) => {
  return (
    <div className={styles['buttons-wrapper']}>
      <QuantityOption type="remove" onClick={onRemove} />
      <QuantityOption type="add" onClick={onAdd} />
    </div>
  );
};

interface IQuantityInput {
  name: string;
  value: string;
  setValue: (value: string) => void;
  maxAmount?: number | 'infinity';
  minAmount?: number;
  label?: string | ReactElement;
  error?: string;
  writeable?: boolean;
  placeholder?: string;
  inputClassName?: string;
  maxCounterWidth?: string;
}

const QuantityInput: VFC<IQuantityInput> = ({
  value,
  name,
  label,
  error,
  placeholder,
  setValue = () => {},
  writeable = true,
  maxAmount = 'infinity',
  minAmount = 0,
  inputClassName,
  maxCounterWidth = '50%',
}) => {
  const checkRange = useCallback(
    (val: number) => {
      if (maxAmount !== 'infinity') {
        if (val <= maxAmount && val >= minAmount) {
          return true;
        }
      } else if (val >= minAmount) {
        return true;
      }
      return false;
    },
    [maxAmount, minAmount],
  );

  const onQuantityChanged = useCallback(
    (val: string) => {
      if (writeable) {
        if (Number.isFinite(+val)) {
          if (val.length !== 0) {
            if (checkRange(+val)) {
              setValue(val);
            }
          } else {
            setValue(val);
          }
        }
      }
    },
    [checkRange, setValue, writeable],
  );

  const onAddHandler = useCallback(() => {
    const nValue = +value;
    if (checkRange(nValue + 1)) {
      setValue(String(nValue + 1));
    }
  }, [checkRange, setValue, value]);

  const onRemoveHandler = useCallback(() => {
    const nValue = +value;
    if (checkRange(nValue - 1)) {
      setValue(String(nValue - 1));
    }
  }, [checkRange, setValue, value]);

  return (
    <DefaultInput
      value={value}
      setValue={onQuantityChanged}
      label={label}
      error={error}
      placeholder={placeholder}
      name={name}
      subInfo={<QuantityButtons onAdd={onAddHandler} onRemove={onRemoveHandler} />}
      maxSubInfoWidth={maxCounterWidth}
      disabled={!writeable}
      className={inputClassName}
    />
  );
};

export default QuantityInput;
