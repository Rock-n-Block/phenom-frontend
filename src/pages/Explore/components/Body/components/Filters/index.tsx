import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BigNumber from 'bignumber.js';
import { omit } from 'lodash';
import mock from 'mock';

import { Button, Checkbox, Dropdown } from 'components';

import { MenuFilter, PriceFilter } from './components';

import Labels from '../Labels';

import styles from './styles.module.scss';

const collections: any = [
  { id: 0, media: mock.search, name: 'Ba' },
  { id: 0, media: mock.search, name: 'Bananas' },
  { id: 0, media: mock.search, name: 'Bali' },
  { id: 0, media: mock.search, name: 'Bar' },
  { id: 0, media: mock.search, name: 'Basketball' },
];
const types = [{ name: 'Single NFT' }, { name: 'Multiple NFT' }];
const sortings = ['Price: Low to High', 'Price: High to Low ', 'Date: Last', 'Date: New'];

type Props = {
  filterCategory: any;
  onFiltersChange: Dispatch<SetStateAction<{}>>;
};

const Filters: FC<Props> = ({ filterCategory, onFiltersChange }) => {
  console.log(filterCategory, onFiltersChange);
  const { t } = useTranslation('Explore');

  const [checkedFilters, setCheckedFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState<any>('');
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
    (filterName) => {
      if (!checkedFilters?.[filterName]) {
        setCheckedFilters({
          ...checkedFilters,
          [filterName]: true,
        });
      } else {
        setCheckedFilters(omit({ ...checkedFilters }, [filterName]));
        setAppliedFilters(omit({ ...appliedFilters }, [filterName]));
      }
    },
    [appliedFilters, checkedFilters],
  );

  const handleMinMaxPrice = useCallback(
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

  const handleApplyFilters = useCallback(() => {
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
          <MenuFilter
            className={styles.dropdown}
            options={collections}
            checkedFilters={checkedFilters}
            keyName="collection"
            onFilterClick={handleFilterClick}
            placeholder="Choose a collection"
          />
          <MenuFilter
            className={styles.dropdownSmall}
            options={types}
            checkedFilters={checkedFilters}
            keyName="type"
            onFilterClick={handleFilterClick}
            placeholder="Choose type"
          />
        </div>
        <PriceFilter
          className={styles.filtersRight}
          minPrice={checkedFilters.minPrice || ''}
          setMinPrice={(value: string) => handleMinMaxPrice('minPrice', value)}
          // setMinPrice={() => {}}
          maxPrice={checkedFilters.maxPrice || ''}
          setMaxPrice={(value: string) => handleMinMaxPrice('maxPrice', value)}
          // setMaxPrice={() => {}}
        />
        <Button
          onClick={handleApplyFilters}
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
            renderFilters={Object.keys(appliedFilters)}
            minPrice={appliedFilters.minPrice}
            maxPrice={appliedFilters.maxPrice}
            changeFilter={handleFilterClick}
          />
        )}
      </div>
      <div className={styles.sorting}>
        <Checkbox value={isAuctionOnly} onChange={handleToggleAuction} content="Auction" />
        <Dropdown
          className={styles.sortingDropdown}
          options={sortings}
          value={sortBy || 'Sort by'}
          setValue={(value: string) => setSortBy(value)}
        />
      </div>
    </>
  );
};

export default Filters;
