import { ReactElement, VFC } from 'react';

import cn from 'classnames';
import { useLanguage } from 'context';

import { Button, Checkbox, Dropdown } from 'components';

import { TAvailableSorts, TSort } from 'types';

import styles from './styles.module.scss';

interface INFTList {
  elements: ReactElement[];
  orientation?: 'vertical';
  sortBy?: TSort;
  auction?: boolean;
  className?: string;
  onSortClick?: (sort: TSort) => void;
  onLoadMore?: () => void;
  onAuctionClick?: () => void;
}
/**
 *
 * @param {ReactElement[]} elements - list of UI components
 * @param {'vertical'} [orientation] - direction on which elements will be drawn
 * @default vertical
 * @param {TSort} [sortBy] - initial sort type
 * @param {boolean} [auction] - initial auction selector
 * @param {string} [className] - wrapper class name
 * @param {(sort: TSort) => void} [onSortClick] - callback which will be called when sort element has been selected
 * @param {() => void} [onLoadMore] - callback which will be called when load button has been pushed
 *  @param {() => void} [onAuctionClick] - callback which will be called when load auction checkbox has been clicked
 * @returns
 */
const NFTList: VFC<INFTList> = ({
  elements,
  orientation = 'vertical',
  sortBy,
  auction,
  className,
  onSortClick,
  onLoadMore,
  onAuctionClick,
}) => {
  const { t } = useLanguage();
  // for further modifications (change size of cards)
  const minSize = 300;
  return (
    <section className={cn(styles[orientation], styles['nft-list__body'], className)}>
      <div className={styles['nft-list__body__sort']}>
        {onAuctionClick && (
          <Checkbox value={auction || false} onChange={onAuctionClick} content="Auction" />
        )}
        {onSortClick && (
          <Dropdown
            value={sortBy || TAvailableSorts[0]}
            options={TAvailableSorts.slice(1)}
            setValue={(sort) => onSortClick(sort)}
            drawBy="name"
            headClassName={styles['nft-sort']}
          />
        )}
      </div>
      <div
        className={styles['nft-list__body__content']}
        style={{ gridTemplateColumns: `repeat(auto-fill,minmax(${minSize}px,1fr))` }}
      >
        {elements.map((el) => el)}
      </div>
      <div className={styles['nft-list__body__load-more']}>
        {onLoadMore && (
          <Button color="outline" onClick={() => onLoadMore()}>
            {t('Explore:Filters.LoadMore')}
          </Button>
        )}
      </div>
    </section>
  );
};

export default NFTList;
