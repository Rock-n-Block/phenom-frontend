import { FC } from 'react';

import cx from 'classnames';

import styles from './styles.module.scss';

type ILoader = {
  className?: string;
  backgroundColor?: 'white' | 'purple' | 'dark';
  size?: 'large' | 'medium' | 'small'
};

const Loader: FC<ILoader> = ({ className, backgroundColor = 'white', size = 'large' }) => {
  return (
    <div className={cx(styles.wrapper, className, styles[`size_${size}`])}>
      <div className={cx(styles.loader, styles.circle, styles[`color_${backgroundColor}`])} />
    </div>
  );
};

export default Loader;
