import { FC } from 'react';

import cx from 'classnames';

import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const PriceFilter: FC<Props> = ({ className }) => {
  return (
    <div className={cx(styles.priceFilter, className)}>
      <Text>Price</Text>
      <div className={styles.prices}>
        <div className={styles.box}>Min PHETA</div>
        <div className={styles.box}>Max PHETA</div>
      </div>
    </div>
  );
};

export default PriceFilter;
