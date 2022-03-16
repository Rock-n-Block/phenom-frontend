import { FC } from 'react';

import cx from 'classnames';

import styles from './styles.module.scss';

type ILoader = {
  className?: string;
  backgroundColor?: 'white' | 'purple';
};

const Loader: FC<ILoader> = ({ className, backgroundColor = 'white' }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={cx(styles.loader, styles.circle, styles[`color_${backgroundColor}`])} />
    </div>
  );
};

export default Loader;
