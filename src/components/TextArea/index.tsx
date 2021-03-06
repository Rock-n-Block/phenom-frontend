import { FocusEventHandler, FormEvent, ReactElement, useCallback, useState, VFC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ITextArea {
  name: string;
  value: string;
  setValue: (value: string) => void;
  maxElements?: number | 'infinity';
  error?: string;
  placeholder?: string;
  label?: string | ReactElement;
  className?: string;
  onBlur?: (e: FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea: VFC<ITextArea> = ({
  name,
  value,
  setValue,
  label,
  error,
  placeholder,
  maxElements = 'infinity',
  className,
  onBlur,
}) => {
  const [symbCount, setSymbCount] = useState(value.length);

  const onFieldChange = useCallback(
    (e: FormEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      const currentValue = e.currentTarget.value;
      if (maxElements === 'infinity') {
        setValue(currentValue);
        setSymbCount(currentValue.length);
      } else if (+maxElements >= currentValue.length) {
        setValue(currentValue);
        setSymbCount(currentValue.length);
      }
      e.stopPropagation();
    },
    [maxElements, setValue],
  );

  const onTextareaBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onBlur?.(e);
    },
    [onBlur],
  );

  return (
    <div className={cn(styles['text-area__body'], className, { [styles['invalid-field']]: error })}>
      <label
        className={cn(styles['text-area__body-label'], { [styles['show-label']]: label })}
        htmlFor={`text_area_${name}`}
      >
        {label}
      </label>
      <textarea
        className={styles['text-area__body-area']}
        name={name}
        id={`text_area_${name}`}
        value={value}
        placeholder={placeholder}
        onChange={onFieldChange}
        onBlur={onTextareaBlur}
      />
      <p
        className={cn(styles['text-area__body-counter'], {
          [styles['counter-active']]: maxElements !== 'infinity',
        })}
      >
        {symbCount}/{parseInt(maxElements.toString(), 10)}
      </p>
      <p className={styles['text-area__body-error']}>{error}</p>
    </div>
  );
};

export default TextArea;
