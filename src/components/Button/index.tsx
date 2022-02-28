import { CSSProperties, FC, PropsWithChildren, RefObject, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
// import { IconNames } from 'typings';

import styles from './styles.module.scss';

type Props = {
  color?: 'outline' | 'dark' | 'light' | 'transparent';
  padding?: 'small' | 'medium' | 'large' | 'extra-large' | string;
  size?: any;
  isFullWidth?: boolean;
  className?: string;
  onClick?: (event: any) => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: string;
  suffixIcon?: string;
  loading?: boolean;
  onMouseLeave?: (event: any) => void;
  onMouseOver?: (event: SyntheticEvent) => void;
  style?: CSSProperties;
  href?: string;
  btnRef?: RefObject<HTMLButtonElement>;
};

/**
 *
 * @param {'large' | 'small' | 'custom'} [tag] - padding of the element {large}
 * custom values:
 * example: [value][units] = 10px
 * * 10px
 * * 10px 10px
 * * 10px 10px 10px
 * * 10px 10px 10px 10px
 * @param {CSSProperties}  [style] - inline styles {}
 * @param {any} [size] - font size of text {normal}
 * @param {Color} [color] - color of text {purple}
 * @param {boolean} [isFullWidth] - set the with of the element 100% {false}
 * @param {(event: any) => void} [onClick] - the callback which will be called after element has been clicked {() => { }}
 * @param {'button' | 'submit'} [type] - type of button {'button'}
 * @param {boolean} [disabled] - set parameter disabled to the button {undefined}
 * @param {string} [icon] - the src of the icon {undefined}
 * @param {boolean} [loading] - set the state of loading {undefined}
 * @param {(event: any) => void} [onMouseLeave] - the callback which be called after the cursor leaves the button {undefined}
 * @param {(event: SyntheticEvent) => void} [onMouseOver] - the callback which be called after the cursor is on the button {undefined}
 * @param {string} [href] - href of the a
 * @param {Align} [align] - align of text {left}
 * @param {Weight} [weight] - font weight {normal}
 * @returns Text component
 */

const Button: FC<PropsWithChildren<Props>> = ({
  color = 'dark',
  size = 'normal',
  isFullWidth = false,
  onClick = () => {},
  className,
  type = 'button',
  children,
  padding = 'medium',
  disabled,
  icon,
  suffixIcon,
  style,
  href,
  loading,
  btnRef,
  onMouseLeave,
  onMouseOver = () => {},
}) => {
  if (href)
    return (
      <Link
        to={href}
        className={cx(
          styles.button,
          styles[size],
          styles[color],
          styles[
            `${
              padding.includes('small') ||
              padding.includes('medium') ||
              padding.includes('large') ||
              padding.includes('extra-large')
                ? padding
                : ''
            }`
          ],
          className,
          {
            [styles.isFullWidth]: isFullWidth,
            [styles.disabled]: disabled,
          },
        )}
        style={
          !(
            padding.includes('small') ||
            padding.includes('medium') ||
            padding.includes('large') ||
            padding.includes('extra-large')
          )
            ? { ...style, padding }
            : style
        }
      >
        {icon && <img src={icon} className={styles.icon} alt="" />}
        {children}
        {suffixIcon && <img src={suffixIcon} className={styles.suffixIcon} alt="" />}
      </Link>
    );
  return (
    <button
      ref={btnRef}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        styles.button,
        styles[size],
        styles[color],
        styles[
          `${
            padding.includes('small') ||
            padding.includes('medium') ||
            padding.includes('large') ||
            padding.includes('extra-large')
              ? padding
              : ''
          }`
        ],
        className,
        {
          [styles.isFullWidth]: isFullWidth,
          [styles.disabled]: disabled || loading,
        },
      )}
      onClick={onClick}
      disabled={disabled || loading}
      style={
        !(
          padding.includes('small') ||
          padding.includes('medium') ||
          padding.includes('large') ||
          padding.includes('extra-large')
        )
          ? { ...style, padding }
          : style
      }
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseOver}
    >
      {icon && <img src={icon} className={styles.icon} alt="" />}
      {children}
      {loading ? (
        <></>
      ) : (
        suffixIcon && <img src={suffixIcon} className={styles.suffixIcon} alt="" />
      )}
    </button>
  );
};

export default Button;
