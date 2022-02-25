import { FC } from 'react';

import cx from 'classnames';

import { DefaultInput, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
};

const PriceFilter: FC<Props> = ({ className, minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  return (
    <div className={cx(styles.priceFilter, className)}>
      <Text>Price</Text>
      <div className={styles.prices}>
        <DefaultInput
          className={styles.price}
          name="minPrice"
          value={minPrice}
          setValue={setMinPrice}
          placeholder="Min"
          subInfo={<Text color="blue">PHETA</Text>}
        />
        <DefaultInput
          className={styles.price}
          name="maxPrice"
          value={maxPrice}
          setValue={setMaxPrice}
          placeholder="Max"
          subInfo={<Text color="blue">PHETA</Text>}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
