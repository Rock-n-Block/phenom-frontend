import { Button } from 'components';
import { useCallback, useMemo, VFC } from 'react';

import FilterLabel from '../FilterLabel';
// import { useNewFilters } from 'hooks';

import s from './Labels.module.scss';

// import { iconChange } from 'assets/img';

interface IProps {
  setDefaultFilters?: any;
  renderFilters: any;
  changeFilter: any;
  minPrice: string;
  maxPrice: string;
}

const Labels: VFC<IProps> = ({
  setDefaultFilters,
  renderFilters,
  changeFilter,
  minPrice,
  maxPrice,
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
      {renderFilters.map((filter: any) => {
        if (filter !== 'minPrice' && filter !== 'maxPrice') {
          return <FilterLabel title={filter} onClick={() => changeFilter(filter)} />;
        }
        return null;
      })}
      {/* {type && <FilterLabel title={type} onClick={() => changeFilter('type', '')} />} */}
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
      {(renderFilters.length || minPrice || maxPrice) && (
        <Button padding="small" color="outline" className={s.button} onClick={setDefaultFilters}>
          CLEAR
        </Button>
      )}
    </div>
  );
};

export default Labels;
