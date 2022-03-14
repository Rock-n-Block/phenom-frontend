import { Button } from 'components';
import { useMemo, VFC } from 'react';
import { FILTER_DIVIDER } from 'utils';

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
  clearMinMax: any;
}

const Labels: VFC<IProps> = ({
  setDefaultFilters,
  renderFilters,
  changeFilter,
  minPrice,
  maxPrice,
  clearMinMax,
}) => {
  const minMaxLabel = useMemo(() => {
    if (minPrice && maxPrice)
      return (+minPrice).toFixed(2) === (+maxPrice).toFixed(2)
        ? `${(+minPrice).toFixed(2)}`
        : `${(+minPrice).toFixed(2)} - ${(+maxPrice).toFixed(2)}`;
    if (!minPrice && maxPrice) return `< ${(+maxPrice).toFixed(2)}`;
    if (minPrice && !maxPrice) return `> ${(+minPrice).toFixed(2)}`;
    return '';
  }, [minPrice, maxPrice]);

  return (
    <div className={s.labels}>
      {renderFilters.map((filter: any) => {
        if (filter !== 'minPrice' && filter !== 'maxPrice') {
          return (
            <FilterLabel
              title={filter.split(FILTER_DIVIDER)[2]}
              onClick={() => changeFilter(filter)}
            />
          );
        }
        return null;
      })}
      {(minPrice || maxPrice) && <FilterLabel title={minMaxLabel} onClick={clearMinMax} />}
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
