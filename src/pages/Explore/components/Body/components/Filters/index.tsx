import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BigNumber from 'bignumber.js';

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
  const { t } = useTranslation('Explore');

  const [checkedFilters, setCheckedFilters] = useState<any>({});
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [isAuctionOnly, setIsAuctionOnly] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleToggleAuction = useCallback(() => {
    setIsAuctionOnly(!isAuctionOnly);
  }, [isAuctionOnly]);

  const handleClearFIlters = useCallback(() => {
    setCheckedFilters({});
    setAppliedFilters({});
    setIsApplied(false);
  }, []);

  const handleFilterClick = useCallback(
    (filterName, filterValue) => {
      setCheckedFilters({ ...checkedFilters, [filterName]: filterValue });
      if (!filterValue) {
        setAppliedFilters({ ...appliedFilters, [filterName]: filterValue });
      }
      if (isApplied) {
        setAppliedFilters({ ...appliedFilters, [filterName]: filterValue });
        setCheckedFilters({ ...checkedFilters, [filterName]: filterValue });
      }
    },
    [appliedFilters, checkedFilters, isApplied],
  );

  const handleAppluFilters = useCallback(() => {
    setIsApplied(true);
  }, []);

  useEffect(() => {
    if (isApplied) {
      setAppliedFilters(checkedFilters);
      setIsApplied(false);
    }
  }, [checkedFilters, isApplied]);
  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filtersLeft}>
          <Dropdown
            className={styles.dropdown}
            value={checkedFilters.collection || 'Choose a collection'}
            setValue={(value: string) => handleFilterClick('collection', value)}
            options={collections}
          />
          <Dropdown
            className={styles.dropdownSmall}
            value={checkedFilters.type || 'Choose type'}
            setValue={(value: string) => handleFilterClick('type', value)}
            options={types}
          />
        </div>
        <PriceFilter
          className={styles.filtersRight}
          minPrice={checkedFilters.minPrice || ''}
          setMinPrice={(value: string) => handleFilterClick('minPrice', value)}
          maxPrice={checkedFilters.maxPrice || ''}
          setMaxPrice={(value: string) => handleFilterClick('maxPrice', value)}
        />
        <Button
          onClick={handleAppluFilters}
          className={styles.apply}
          disabled={
            checkedFilters.maxPrice &&
            checkedFilters.minPrice &&
            !new BigNumber(checkedFilters.maxPrice).isGreaterThanOrEqualTo(
              new BigNumber(checkedFilters.minPrice),
            )
          }
        >
          {t('Filters.Apply')}
        </Button>
      </div>
      <div className={styles.filtersLabels}>
        {!!Object.keys(appliedFilters).length && (
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
