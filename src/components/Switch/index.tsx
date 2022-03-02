import cx from 'classnames';

import { Text } from 'components';

import styles from './Switch.module.scss';

interface ISwitchProps {
  className?: string;
  value: boolean;
  setValue: (foo: boolean) => void;
  name?: string;
  optionLeft?: string;
  optionRight?: string;
}

const Switch: React.FC<ISwitchProps> = ({
  className,
  value,
  setValue,
  name,
  optionLeft,
  optionRight,
}) => {
  return (
    <label htmlFor={name || 'toogle'} className={cx(styles.switch, className)}>
      <div
        className={styles.left}
        onClick={() => setValue(!value)}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
      >
        {optionLeft && (
          <Text
            size="m"
            weight="semibold"
            className={cx(styles.option, { [styles.optionActive]: value })}
          >
            {optionLeft}
          </Text>
        )}
      </div>
      <span className={cx(styles.toggle, { [styles.toggleActive]: value })} />
      <div
        className={styles.right}
        onClick={() => setValue(!value)}
        onKeyDown={() => {}}
        tabIndex={0}
        role="button"
      >
        {optionRight && (
          <Text
            size="m"
            weight="semibold"
            className={cx(styles.option, { [styles.optionActive]: !value })}
          >
            {optionRight}
          </Text>
        )}
      </div>
    </label>
  );
};

export default Switch;
