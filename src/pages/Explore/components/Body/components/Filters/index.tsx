import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';

import { Button, Checkbox, Dropdown } from 'components';

import { PriceFilter } from './components';

import Labels from '../Labels';

import styles from './styles.module.scss';

const collections = ['Collection1', 'Collection2', 'Collection3', 'Collection4', 'Collection5'];
const types = ['Single NFT', 'Multiple NFT'];
const sortings = ['Price: Low to High', 'Price: High to Low ', 'Date: Last', 'Date: New'];

type Props = {
  filterCategory: any;
  onFiltersChange: Dispatch<SetStateAction<{}>>;
};

const Filters: FC<Props> = ({ filterCategory, onFiltersChange }) => {
  console.log(filterCategory, onFiltersChange);

  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [isAuctionOnly, setIsAuctionOnly] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleToggleAuction = useCallback(() => {
    setIsAuctionOnly(!isAuctionOnly);
  }, [isAuctionOnly]);

  const handleClearFIlters = useCallback(() => {
    setAppliedFilters({});
    setIsApplied(false);
  }, []);

  const handleFilterClick = useCallback(
    (filterName, filterValue) => {
      setAppliedFilters({ ...appliedFilters, [filterName]: filterValue });
    },
    [appliedFilters],
  );
  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filtersLeft}>
          <Dropdown
            className={styles.dropdown}
            value={appliedFilters.collection || 'Choose a collection'}
            setValue={(value: string) => handleFilterClick('collection', value)}
            options={collections}
          />
          <Dropdown
            className={styles.dropdownSmall}
            value={appliedFilters.type || 'Choose type'}
            setValue={(value: string) => handleFilterClick('type', value)}
            options={types}
          />
        </div>
        <PriceFilter
          className={styles.filtersRight}
          minPrice={appliedFilters.minPrice || ''}
          setMinPrice={(value: string) => handleFilterClick('minPrice', value)}
          maxPrice={appliedFilters.maxPrice || ''}
          setMaxPrice={(value: string) => handleFilterClick('maxPrice', value)}
        />
        <Button onClick={() => setIsApplied(true)} className={styles.apply} padding="small">
          APPLY
        </Button>
      </div>
      <div className={styles.filtersLabels}>
        {isApplied && (
          <Labels
            setDefaultFilters={handleClearFIlters}
            filters={appliedFilters}
            changeFilter={handleFilterClick}
          />
        )}
      </div>
      <div className={styles.sorting}>
        <Checkbox value={isAuctionOnly} onChange={handleToggleAuction} content="Auction" />
        <Dropdown
          className={styles.sortingDropdown}
          options={sortings}
          value={appliedFilters.sortBy || 'Sort by'}
          setValue={(value: string) => handleFilterClick('sortBy', value)}
        />
      </div>
    </>
  );
};

export default Filters;
