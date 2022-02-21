import cx from 'classnames';

import { Button } from 'components';

import { iconCross } from 'assets/img';

import styles from './styles.module.scss';

interface Props {
  className?: string;
  placeholder?: string;
  icon?: any;
  onChange?: (value: any) => void;
  value?: string;
  isButton?: boolean;
  onButtonClick?: () => void;
}

const TextInput: React.FC<Props> = ({
  className,
  placeholder,
  icon,
  onChange,
  value,
  isButton,
  onButtonClick,
  // ...props
}) => {
  return (
    <div className={cx(styles.field, className)}>
      {icon &&
        (typeof icon === 'string' ? <img src={icon} alt="icon" className={styles.icon} /> : icon)}
      <input
        onChange={onChange}
        className={cx(styles.input, { [styles.withIcon]: icon })}
        placeholder={placeholder}
        value={value}
      />
      {isButton && (
        <Button
          onClick={onButtonClick ? () => onButtonClick() : () => {}}
          className={styles.inputButton}
          color="transparent"
        >
          <img src={iconCross} alt="" />
        </Button>
      )}
    </div>
  );
};

export default TextInput;
