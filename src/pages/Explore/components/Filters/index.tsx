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
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  // isApplied: boolean;
  setIsApplied: (value: boolean) => void;
};

const Filters: FC<Props> = ({
  collection,
  setCollection,
  collections,
  type,
  setType,
  types,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  // isApplied,
  setIsApplied,
}) => {
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
      <PriceFilter
        className={styles.filtersRight}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
      <Button onClick={() => setIsApplied(true)} className={styles.apply}>
        Apply
      </Button>
    </div>
  );
};

export default Filters;
