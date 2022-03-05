import { FC } from 'react';

import cx from 'classnames';

import styles from './styles.module.scss';

type ILoader = {
  className?: string;
};

const Loader: FC<ILoader> = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.loader, styles.circle)} />
    </div>
  );
};

export default Loader;
