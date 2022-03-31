import { FC, FormEvent, useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { Button, Checkbox, EllipsisText, Text } from 'components';
import { FILTER_DIVIDER } from 'utils';

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
  backendLabel: string;
  onLoadMoreClick?: () => void;
  hasLoadMore?: boolean;
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
  backendLabel,
  onLoadMoreClick,
  hasLoadMore = false,
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
          {options.map(({ value, label, media }: any, key: number) => {
            const filterName: any = `${backendLabel}${FILTER_DIVIDER}${label}${FILTER_DIVIDER}${value}`;
            return (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cn(styles.option)}
                onClick={(e: FormEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClickOption(filterName);
                }}
                key={`dropdown_option_${value}`}
              >
                <Checkbox
                  value={checkedFilters?.[filterName] || false}
                  onChange={(e: FormEvent<HTMLInputElement>) => handleClickCheckbox(e, filterName)}
                  id={key.toString()}
                />
                {media && <img src={media} alt="media" className={styles.optionMedia} />}
                <EllipsisText className={styles.text}>
                  <Text tag="span">{value}</Text>
                </EllipsisText>
              </div>
            );
          })}
          {hasLoadMore && (
            <Button padding="small" onClick={onLoadMoreClick} className={styles.button}>
              Load more
            </Button>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
