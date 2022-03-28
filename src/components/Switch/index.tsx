import { FormEvent, ReactElement, useCallback, VFC } from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

type TLabels = {
  inactive?: ReactElement | string;
  active?: ReactElement | string;
};

interface ISwitch {
  name: string;
  checked: boolean;
  setChecked: (state: boolean) => void;
  labels?: TLabels;
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

const Switch: VFC<ISwitch> = ({
  checked,
  setChecked,
  name,
  labels,
  className,
  thumbClassName,
  trackClassName,
}) => {
  const onCheckClick = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setChecked(!checked);
    },
    [checked, setChecked],
  );
  return (
    <div className={cn(styles['default-switch__body'], className)}>
      <label
        className={cn(styles['default-switch__body-area'], {
          [styles['switch-active']]: checked,
        })}
        htmlFor={`default_switch_${name}`}
      >
        <input
          className={cn(styles['default-switch__body-area__input'])}
          onClick={onCheckClick}
          checked={checked}
          onChange={() => {}}
          type="checkbox"
          id={`default_switch_${name}`}
        />
        <div className={cn({ [styles['default-switch__body-area__inactive']]: labels?.inactive })}>
          {labels?.inactive}
        </div>

        <span className={cn(thumbClassName, styles['default-switch__body-area__track'])}>
          <span className={cn(trackClassName, styles['default-switch__body-area__thumb'])} />
        </span>
        <div className={cn({ [styles['default-switch__body-area__active']]: labels?.active })}>
          {labels?.active}
        </div>
      </label>
    </div>
  );
};
export default Switch;
