import { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import collectionsSelector from 'store/collections/selectors';

import BigNumber from 'bignumber.js';
import cn from 'classnames';
import { omit } from 'lodash';

import { Button } from 'components';
import { convertFilterValuesForBackend } from 'utils';

import { MenuFilter, PriceFilter } from './components';

import { useShallowSelector } from 'hooks';

import Labels from '../Labels';

import styles from './styles.module.scss';

const types = [
  { value: 'Single NFT', label: 'ERC721' },
  { value: 'Multiple NFT', label: 'ERC721' },
];

type Props = {
  filterCategory: any;
  onFiltersChange: Dispatch<SetStateAction<{}>>;
};

const Filters: FC<Props> = ({ filterCategory, onFiltersChange }) => {
  console.log(filterCategory);
  const { t } = useTranslation('Explore');
  const collections = useShallowSelector(collectionsSelector.getProp('collections'));
  const [checkedFilters, setCheckedFilters] = useState<any>({});
  const [appliedFilters, setAppliedFilters] = useState<any>({});
  const [isApplied, setIsApplied] = useState(false);

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
    onFiltersChange({ ...convertFilterValuesForBackend(appliedFilters) });
  }, [appliedFilters, onFiltersChange]);
  return (
    <>
      <div className={styles.filters}>
        <div className={styles.filtersLeft}>
          <MenuFilter
            className={styles.dropdown}
            options={collections.map((collection: any) => ({
              value: collection.name,
              media: collection.avatar,
              label: collection.url,
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
      <div
        className={cn(styles.filtersLabels, {
          [styles.active]: !!Object.keys(appliedFilters).length,
        })}
      >
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
    </>
  );
};

export default Filters;
