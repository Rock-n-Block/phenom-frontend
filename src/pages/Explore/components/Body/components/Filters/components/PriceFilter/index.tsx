import { FC } from 'react';

import cx from 'classnames';

import { DefaultInput, Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  minPrice: string;
  maxPrice: string;
  changePrice: (minPrice: any, maxPrice: any) => void;
};

const PriceFilter: FC<Props> = ({ className, minPrice, maxPrice, changePrice }) => {
  return (
    <div className={cx(styles.priceFilter, className)}>
      <Text>Price</Text>
      <div className={styles.prices}>
        <DefaultInput
          className={styles.price}
          name="minPrice"
          value={minPrice}
          setValue={(value) => changePrice(value, maxPrice)}
          placeholder="Min"
          subInfo={<Text color="blue">PHETA</Text>}
          type="number"
          max={maxPrice}
        />
        <DefaultInput
          className={styles.price}
          name="maxPrice"
          value={maxPrice}
          setValue={(value) => changePrice(minPrice, value)}
          placeholder="Max"
          subInfo={<Text color="blue">PHETA</Text>}
          type="number"
          min={minPrice}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
