import { FC, FormEvent, useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { Checkbox, Text } from 'components';

import { iconArrowDownGray } from 'assets/img';

import styles from './styles.module.scss';

interface IDropdownProps {
  keyName: string;
  className?: string;
  headClassName?: string;
  bodyClassName?: string;
  options: Array<any>;
  checkedFilters: Array<any>;
  onFilterClick: (filterName: string) => void;
  placeholder: string;
}

const Dropdown: FC<IDropdownProps> = ({
  keyName,
  className,
  headClassName,
  bodyClassName,
  options,
  checkedFilters,
  onFilterClick,
  placeholder,
}) => {
  const [visible, setVisible] = useState(false);
  const handleClickOption = useCallback(
    (filterName: string) => {
      onFilterClick(filterName);
    },
    [onFilterClick],
  );

  const handleClickCheckbox = useCallback(
    (e: FormEvent<HTMLInputElement>, filterName: string) => {
      e.preventDefault();
      e.stopPropagation();
      onFilterClick(filterName);
    },
    [onFilterClick],
  );

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div className={cn(styles.filter, className, { [styles.active]: visible })} id={keyName}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cn(styles.head, headClassName)}
          onClick={() => setVisible(!visible)}
        >
          <div className={styles.selection}>{placeholder}</div>
          <img alt="open dropdown" src={iconArrowDownGray} className={styles.arrow} />
        </div>
        <div className={cn(styles.body, bodyClassName)}>
          {options.map(({ name, media }: any, key: number) => (
            <div
              onKeyDown={() => {}}
              tabIndex={0}
              role="button"
              className={cn(styles.option)}
              onClick={(e: FormEvent<HTMLDivElement>) => {
                e.preventDefault();
                e.stopPropagation();
                handleClickOption(name);
              }}
              key={`dropdown_option_${name}`}
            >
              <Checkbox
                value={checkedFilters?.[name]}
                onChange={(e: FormEvent<HTMLInputElement>) => handleClickCheckbox(e, name)}
                id={key.toString()}
              />
              {media && <img src={media} alt="media" />}
              <Text className={styles.text} tag="span">
                {name}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
