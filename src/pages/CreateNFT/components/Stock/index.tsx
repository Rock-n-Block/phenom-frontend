import { VFC } from 'react';

import cn from 'classnames';

import { QuantityInput, Text } from 'components';

import styles from './styles.module.scss';

interface IStock {
  count: string;
  setCount: (count: string) => void;
  className?: string;
}

const Stock: VFC<IStock> = ({ count, setCount, className }) => {
  return (
    <section className={cn(styles['nft-quantity__wrapper'], className)}>
      <Text
        tag="h4"
        color="dark"
        weight="medium"
        className={styles['nft-quantity__wrapper__title']}
      >
        In stock
      </Text>
      <QuantityInput
        name="NFT-stock"
        value={count}
        setValue={setCount}
        label="Quantity"
        inputClassName={styles['nft-quantity__wrapper__input']}
        maxCounterWidth="160px"
      />
    </section>
  );
};

export default Stock;
