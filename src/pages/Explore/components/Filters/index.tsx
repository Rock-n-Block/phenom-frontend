import { FC } from 'react';

import { Button, Dropdown } from 'components';

import { PriceFilter } from './components';

import styles from './styles.module.scss';

type Props = {
  collection: string;
  setCollection: (value: string) => void;
  collections: Array<any>;
  type: string;
  setType: (value: string) => void;
  types: Array<any>;
};

const Filters: FC<Props> = ({ collection, setCollection, collections, type, setType, types }) => {
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
      <PriceFilter className={styles.filtersRight} />
      <Button className={styles.apply}>Apply</Button>
    </div>
  );
};

export default Filters;
