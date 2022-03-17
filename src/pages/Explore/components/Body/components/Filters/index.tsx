import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import nftSelector from 'store/nfts/selectors';

import BigNumber from 'bignumber.js';
import { omit } from 'lodash';

import { Button, Checkbox, Dropdown } from 'components';
import { convertFilterValuesForBackend } from 'utils';

import { MenuFilter, PriceFilter } from './components';

import { useShallowSelector } from 'hooks';

import Labels from '../Labels';

import styles from './styles.module.scss';

const types = [
  { value: 'Single NFT', label: 'ERC721' },
  { value: 'Multiple NFT', label: 'ERC721' },
];
const sortings = [
  { value: 'Price: Low to High', label: '-price' },
  { value: 'Price: High to Low', label: 'price' },
  { value: 'Date: Last', label: '-date' },
  { value: 'Date: New', label: 'date' },
];

type Props = {
  filterCategory: any;
  onFiltersChange: Dispatch<SetStateAction<{}>>;
};

const Filters: FC<Props> = ({ filterCategory, onFiltersChange }) => {
  console.log(filterCategory);
  const { t } = useTranslation('Explore');
  const collections = useShallowSelector(nftSelector.getProp('collections'));
  console.log(collections)
  const [checkedFilters, setCheckedFilters] = useState<any>({});
  const [orderBy, setOrderBy] = useState<any>('');
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
    (minPrice, maxPrice) => {
      setCheckedFilters({ ...checkedFilters, minPrice, maxPrice });
      if (!minPrice && !maxPrice) {
        setAppliedFilters(omit({ ...appliedFilters }, ['minPrice', 'maxPrice']));
      }
      if (isApplied) {
        setAppliedFilters({ ...appliedFilters, minPrice, maxPrice });
        setCheckedFilters({ ...checkedFilters, minPrice, maxPrice });
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

  useEffect(() => {
    onFiltersChange({ ...convertFilterValuesForBackend(appliedFilters), isAuctionOnly, orderBy });
  }, [appliedFilters, isAuctionOnly, onFiltersChange, orderBy]);
  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filtersLeft}>
          <MenuFilter
            className={styles.dropdown}
            options={collections.map((collection: any) => ({
              value: collection.name,
              media: collection.media,
              label: collection.id,
            }))}
            checkedFilters={checkedFilters}
            keyName="collection"
            onFilterClick={handleFilterClick}
            placeholder="Choose a collection"
            backendLabel="collections"
          />
          <MenuFilter
            className={styles.dropdownSmall}
            options={types}
            checkedFilters={checkedFilters}
            keyName="type"
            onFilterClick={handleFilterClick}
            placeholder="Choose type"
            backendLabel="standart"
          />
        </div>
        <PriceFilter
          className={styles.filtersRight}
          minPrice={checkedFilters.minPrice || ''}
          maxPrice={checkedFilters.maxPrice || ''}
          changePrice={handleMinMaxPrice}
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
            clearMinMax={() => handleMinMaxPrice('', '')}
          />
        )}
      </div>
      <div className={styles.sorting}>
        <Checkbox value={isAuctionOnly} onChange={handleToggleAuction} content="Auction" />
        <Dropdown
          className={styles.sortingDropdown}
          options={sortings}
          value={orderBy || { value: 'Sort by' }}
          drawBy="value"
          returnBy="value"
          setValue={(value: string) => setOrderBy(value)}
        />
      </div>
    </>
  );
};

export default Filters;
