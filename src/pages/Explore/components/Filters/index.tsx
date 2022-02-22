import { FC, useState } from 'react';

import { Button, Dropdown, Text } from 'components';

import styles from './styles.module.scss';

const collections = ['Collection1', 'Collection2', 'Collection3', 'Collection4', 'Collection5'];
const types = ['Single NFT', 'Multiple NFT'];

const Filters: FC = () => {
  const [collection, setCollection] = useState(collections[0]);
  const [type, setType] = useState(types[0]);

  return (
    <div className={styles.filters}>
      <div className={styles.filtersLeft}>
        <Dropdown
          className={styles.dropdown}
          value={collection}
          setValue={setCollection}
          options={collections}
        />
        <Dropdown
          className={styles.dropdownSmall}
          value={type}
          setValue={setType}
          options={types}
        />
      </div>
      <div className={styles.filtersRight}>
        <Text>Price</Text>
        <div className={styles.prices}>
          <div className={styles.box}>Min PHETA</div>
          <div className={styles.box}>Max PHETA</div>
        </div>
        <Button className={styles.apply}>Apply</Button>
      </div>
    </div>
  );
};

export default Filters;
