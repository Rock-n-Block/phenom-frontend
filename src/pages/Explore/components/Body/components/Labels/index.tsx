import { Button } from 'components';
import { useCallback, useMemo, VFC } from 'react';

import FilterLabel from '../FilterLabel';
// import { useNewFilters } from 'hooks';

import s from './Labels.module.scss';

// import { iconChange } from 'assets/img';

interface IProps {
  // filters: any;
  setDefaultFilters?: any;
  filters: any;
  changeFilter: any;
}

const Labels: VFC<IProps> = ({
  setDefaultFilters,
  filters: { collection, type, minPrice, maxPrice },
  changeFilter,
}) => {
  const minMaxLabel = useMemo(() => {
    if (minPrice && maxPrice) return `${(+minPrice).toFixed(2)} - ${(+maxPrice).toFixed(2)}`;
    if (!minPrice && maxPrice) return `< ${(+maxPrice).toFixed(2)}`;
    if (minPrice && !maxPrice) return `> ${(+minPrice).toFixed(2)}`;
    return '';
  }, [minPrice, maxPrice]);

  const clearMinMax = useCallback(() => {
    if (maxPrice) {
      changeFilter('maxPrice', '');
    }
    if (minPrice) {
      changeFilter('minPrice', '');
    }
  }, [changeFilter, maxPrice, minPrice]);

  return (
    <div className={s.labels}>
      {collection && (
        <FilterLabel title={collection} onClick={() => changeFilter('collection', '')} />
      )}
      {type && <FilterLabel title={type} onClick={() => changeFilter('type', '')} />}
      {(minPrice || maxPrice) && (
        <FilterLabel
          // icon={iconChange}
          title={minMaxLabel}
          onClick={clearMinMax}
        />
      )}
      {/* {textSearch && (
        <FilterLabel title={`Text: ${textSearch}`} onClick={() => setTextSearch('')} />
      )} */}
      {(collection || type || minPrice || maxPrice) && (
        <Button padding="small" color="outline" className={s.button} onClick={setDefaultFilters}>
          CLEAR
        </Button>
      )}
    </div>
  );
};

export default Labels;
