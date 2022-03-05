import { FC, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { Text } from 'components';

import { iconArrowDownGray } from 'assets/img';

import styles from './Dropdown.module.scss';

interface IDropdownProps {
  className?: string;
  value: any;
  setValue: (str: any) => void;
  options: Array<any>;
  isWithImage?: boolean;
  isWritable?: boolean;
  name?: string;
  suffix?: string;
  headClassName?: string;
  bodyClassName?: string;
  returnBy?: string;
  drawBy?: string;
  label?: string;
  error?: string;
}

const Dropdown: FC<IDropdownProps> = ({
  className,
  value,
  setValue,
  options,
  isWithImage,
  isWritable,
  name,
  suffix = '',
  headClassName,
  bodyClassName,
  returnBy = 'symbol',
  drawBy = 'symbol',
  label,
  error,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (str: any) => {
    setValue(str);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <Text size="s" weight="medium" className={cn(styles.label, className)}>
          {label}
        </Text>
      )}
      <div
        className={cn(styles.dropdown, {
          [styles.active]: visible,
          [styles.invalid]: error,
        })}
        id={name}
      >
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn(styles.head, headClassName)}
          onClick={() => setVisible(!visible)}
        >
          {isWritable ? (
            <input value={value[drawBy]} className={styles.input} />
          ) : (
            <div className={styles.selection}>{value[drawBy]}</div>
          )}
          <img alt="open dropdown" src={iconArrowDownGray} className={styles.arrow} />
        </div>
        {error && <Text className={styles.error}>{error}</Text>}
        {!isWithImage ? (
          <div className={cn(styles.body, bodyClassName)}>
            {typeof options[0] === 'string'
              ? options.map((option: string) => (
                  <div
                    onKeyDown={() => {}}
                    tabIndex={0}
                    role="button"
                    className={cn(
                      styles.option,
                      {
                        [styles.selectioned]: option === value,
                      },
                      option === value ? 'selected' : '',
                    )}
                    onClick={() => handleClick(option)}
                    key={`dropdown_option_${option}`}
                  >
                    {option}
                    {suffix}
                  </div>
                ))
              : options.map((option) => (
                  <div
                    onKeyDown={() => {}}
                    tabIndex={0}
                    role="button"
                    className={cn(styles.option, {
                      [styles.selectioned]: option[drawBy] === value[drawBy],
                    })}
                    onClick={() => handleClick(option)}
                    key={`dropdown_option_${option[returnBy]}`}
                  >
                    {option.icon}
                    <Text className={styles.text} tag="span">
                      {option[drawBy]}
                    </Text>
                  </div>
                ))}
          </div>
        ) : (
          <div className={cn(styles.body, bodyClassName)}>
            {options.map((option: any) => (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(
                  styles.option,
                  {
                    [styles.selectioned]: option?.symbol === value,
                  },
                  option.symbol === value ? 'text-gradient' : '',
                )}
                onClick={() => handleClick(option)}
                key={`dropdown_option_${option[returnBy]}`}
              >
                <img alt="" className={styles.image} src={option.image} />
                <Text className={styles.text} tag="span">
                  {option[drawBy]?.toUpperCase()}
                </Text>
              </div>
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
