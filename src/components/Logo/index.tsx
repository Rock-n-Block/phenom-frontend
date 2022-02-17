import { FC } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';

import { LogoIcon } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  color?: 'dark' | 'light';
  className?: string;
};

const Logo: FC<Props> = ({ color = 'dark', className }) => {
  return (
    <Link className={cx(styles.logo, className)} to="/">
      <LogoIcon className={styles[color]} />
    </Link>
  );
};

export default Logo;
