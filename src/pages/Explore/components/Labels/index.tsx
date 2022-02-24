import { Button } from 'components';
import { useCallback, useMemo, VFC } from 'react';

import FilterLabel from '../FilterLabel';
// import { useNewFilters } from 'hooks';

import s from './Labels.module.scss';

// import { iconChange } from 'assets/img';

interface IProps {
  // filters: any;
  setDefaultFilters?: any;
  minPrice?: any;
  maxPrice?: any;
  setMaxPrice?: any;
  setMinPrice?: any;
  setTextSearch?: any;
  textSearch?: any;
  activeCollection?: any;
  setActiveCollection?: any;
  type?: any;
  setType?: any;
}

const Labels: VFC<IProps> = ({
  // filters: {
  setDefaultFilters,
  minPrice,
  maxPrice,
  setMaxPrice,
  setMinPrice,
  setTextSearch,
  textSearch,
  activeCollection,
  setActiveCollection,
  type,
  setType,
  // },
}) => {
  const minMaxLabel = useMemo(() => {
    if (minPrice && maxPrice) return `${(+minPrice).toFixed(2)} - ${(+maxPrice).toFixed(2)}`;
    if (!minPrice && maxPrice) return `< ${(+maxPrice).toFixed(2)}`;
    if (minPrice && !maxPrice) return `> ${(+minPrice).toFixed(2)}`;
    return '';
  }, [minPrice, maxPrice]);

  const clearMinMax = useCallback(() => {
    if (maxPrice) {
      setMaxPrice('');
    }
    if (minPrice) {
      setMinPrice('');
    }
  }, [maxPrice, minPrice, setMaxPrice, setMinPrice]);

  return (
    <div className={s.labels}>
      {activeCollection && (
        <FilterLabel title={activeCollection} onClick={() => setActiveCollection('')} />
      )}
      {type && <FilterLabel title={type} onClick={() => setType('')} />}
      {(minPrice || maxPrice) && (
        <FilterLabel
          // icon={iconChange}
          title={minMaxLabel}
          onClick={clearMinMax}
        />
      )}
      {textSearch && (
        <FilterLabel title={`Text: ${textSearch}`} onClick={() => setTextSearch('')} />
      )}
      <Button padding="small" color="outline" className={s.button} onClick={setDefaultFilters}>
        Clear
      </Button>
    </div>
  );
};

export default Labels;
