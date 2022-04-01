import { FC } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';

import { LogoIcon, MetaverseIcon, PhenomIcon } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  color?: 'dark' | 'light';
  className?: string;
  adaptive?: boolean;
};

const Logo: FC<Props> = ({ color = 'dark', className, adaptive = false }) => {
  return (
    <Link className={cx(styles.logo, className)} to="/">
      {adaptive ? (
        <div className={styles['adaptive-logo']}>
          <PhenomIcon className={cx(styles['phenom-part'], styles[color])} />
          <MetaverseIcon className={styles[color]} />
        </div>
      ) : (
        <LogoIcon className={styles[color]} />
      )}
    </Link>
  );
};

export default Logo;
