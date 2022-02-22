import { FC, useState } from 'react';

import { Dropdown, Text } from 'components';

import styles from './styles.module.scss';

const collections = ['Collection1', 'Collection2', 'Collection3', 'Collection4', 'Collection5'];
const types = ['Single NFT', 'Multiple NFT'];

const Filters: FC = () => {
  const [collection, setCollection] = useState(collections[0]);
  const [type, setType] = useState(types[0]);

  return (
    <div className={styles.filters}>
      <div className={styles.filtersLeft}>
        <Dropdown value={collection} setValue={setCollection} options={collections} />
        <Dropdown value={type} setValue={setType} options={types} />
      </div>
      <div className={styles.filtersRight}>
        <Text>Price</Text>
      </div>
    </div>
  );
};

export default Filters;
