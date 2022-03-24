import { FormEvent, ReactElement, useCallback, VFC } from 'react';

import cn from 'classnames';
import { useLanguage } from 'context';

import { Button, Checkbox, Dropdown } from 'components';
import { Text } from 'components/Typography';

import { TAvailableSorts, TSort } from 'types';

import styles from './styles.module.scss';

interface INFTList {
  elements: ReactElement[];
  orientation?: 'vertical';
  sortBy?: TSort;
  auction?: boolean;
  className?: string;
  emptyMsg?: string;
  pages?: number;
  currentPage?: number;
  isLoading?: boolean;
  onSortClick?: (sort: TSort) => void;
  onLoadMore?: (page: number) => void;
  onAuctionClick?: () => void;
}

const isLoadMoreActive = (
  current: number | undefined,
  amount: number | undefined,
  loadMoreFunc?: (page: number) => void,
) => {
  return loadMoreFunc && !(current === undefined) && !(amount === undefined) && current < amount;
};

/**
 *
 * @param {ReactElement[]} elements - list of UI components
 * @param {'vertical'} [orientation] - direction on which elements will be drawn
 * @default vertical
 * @param {TSort} [sortBy] - initial sort type
 * @param {boolean} [auction] - initial auction selector
 * @param {string} [className] - wrapper class name
 * @param {string} [emptyMsg] - message which will be displayed when the count of the elements equals zero
 * @default 'There in no elements'
 * @param {(sort: TSort) => void} [onSortClick] - callback which will be called when sort element has been selected
 * @param {() => void} [onLoadMore] - callback which will be called when load button has been pushed
 * @param {() => void} [onAuctionClick] - callback which will be called when load auction checkbox has been clicked
 * @returns
 */
const NFTList: VFC<INFTList> = ({
  elements,
  orientation = 'vertical',
  sortBy,
  auction,
  className,
  emptyMsg = 'There in no elements',
  pages,
  currentPage,
  isLoading = false,
  onSortClick,
  onLoadMore,
  onAuctionClick,
}) => {
  const { t } = useLanguage();

  const onLoadMoreHandler = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (currentPage) {
        onLoadMore?.(currentPage + 1);
      }
    },
    [currentPage, onLoadMore],
  );

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
        style={{
          gridTemplateColumns:
            elements.length !== 0 ? `repeat(auto-fill,minmax(${minSize}px,1fr))` : '1fr',
        }}
      >
        {elements.length !== 0 && elements.map((el) => el)}
        {elements.length === 0 && (
          <Text size="xl" align="center" weight="bold">
            {emptyMsg}
          </Text>
        )}
      </div>
      <div className={styles['nft-list__body__load-more']}>
        {isLoadMoreActive(currentPage, pages, onLoadMore) && (
          <Button
            loading={isLoading}
            loaderColor="purple"
            loaderSize="small"
            color="outline"
            onClick={onLoadMoreHandler}
          >
            {t('Explore:Filters.LoadMore')}
          </Button>
        )}
      </div>
    </section>
  );
};

export default NFTList;
