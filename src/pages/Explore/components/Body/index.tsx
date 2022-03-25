import { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { searchNfts } from 'store/nfts/actions';
import { clearNfts } from 'store/nfts/reducer';
import nftSelector from 'store/nfts/selectors';

import { debounce } from 'lodash';

import { ArtCardSkeleton, TabLookingComponent } from 'components';
import { ITab } from 'components/TabLookingComponent';
import { mapSortToRequest } from 'utils';

import { Filters, NFTPreviewer } from './components';

import { DEBOUNCE_DELAY_100 } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Tag, TAvailableSorts, TNullable, TSort } from 'types';
import { SearchNftReq } from 'types/requests';

import styles from './styles.module.scss';

interface IBody {
  activeCategory: any;
  tags: Tag[];
  activeTag: string;
  handleSetActiveTag: any;
}

const Body: VFC<IBody> = ({ activeCategory, tags, activeTag, handleSetActiveTag }) => {
  const pageChangeScrollAnchor = useRef<TNullable<HTMLDivElement>>(null);
  const nftCards = useShallowSelector(nftSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftSelector.getProp('totalPages'));
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<any>({});
  const dispatch = useDispatch();

  const handleSearchNfts = useCallback(
    (
      category: any,
      activetags: string,
      // TODO: types filters
      filtersData: any,
      page: number,
      shouldConcat?: boolean,
    ) => {
      const requestData: SearchNftReq = {
        type: 'items',
        categories: category?.id,
        tags: activetags ? +activetags : undefined,
        page,
        collections: filtersData?.collections?.join(','),
        standart: filtersData?.standart?.join(','),
        max_price: filtersData?.maxPrice,
        min_price: filtersData?.minPrice,
        on_auc_sale: filtersData?.isAuctionOnly,
        order_by: mapSortToRequest(filtersData?.orderBy),
      };
      dispatch(searchNfts({ requestData, shouldConcat }));
    },
    [dispatch],
  );

  const debouncedHandleSearchNfts = useRef(debounce(handleSearchNfts, DEBOUNCE_DELAY_100)).current;

  const handleLoadMore = useCallback(
    (page: number, shouldConcat = false) => {
      handleSearchNfts(activeCategory, activeTag, filters, page, shouldConcat);
    },
    [activeCategory, activeTag, filters, handleSearchNfts],
  );

  const isInitRender = useRef(true);

  useEffect(() => {
    debouncedHandleSearchNfts(activeCategory, activeTag, filters, 1);
    setCurrentPage(1);
  }, [activeCategory, activeTag, debouncedHandleSearchNfts, filters]);

  useEffect(() => {
    if (pageChangeScrollAnchor && pageChangeScrollAnchor.current && !isInitRender.current) {
      pageChangeScrollAnchor.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    isInitRender.current = false;
  }, [currentPage]);

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  const handleClickCategory = useCallback(
    (value) => {
      setCurrentPage(1);
      handleSetActiveTag(value);
    },
    [handleSetActiveTag],
  );

  const handleAuctionChange = useCallback((isAuctionOnly: boolean) => {
    setFilters((prev: any) => ({ ...prev, isAuctionOnly }));
  }, []);

  const handleSortChange = useCallback((sort: TSort) => {
    setFilters((prev: any) => ({ ...prev, orderBy: sort }));
  }, []);

  const NFTsCardsSkeleton = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => new Array(6).fill(0).map((_, k) => <ArtCardSkeleton key={k} />),
    [],
  );

  return (
    <>
      {tags && tags.length !== 0 && (
        <TabLookingComponent
          tabs={tags.map<ITab>((tag) => ({ key: String(tag.id), title: tag.name }))}
          wrapClassName={styles.categories}
          action={(value) => handleClickCategory(value)}
          activeTab={String(activeTag)}
          tabClassName={styles.category}
        />
      )}

      <div className={styles.container}>
        <Filters filterCategory={activeCategory} onFiltersChange={setFilters} />
        <div className={styles.anchor} ref={pageChangeScrollAnchor} />
        <div className={styles.filterResults}>
          <NFTPreviewer
            cardsData={nftCards}
            pages={totalPages}
            onLoadMore={() => handleLoadMore(currentPage, true)}
            skeleton={NFTsCardsSkeleton}
            auction={filters?.isAuctionOnly}
            setAuction={handleAuctionChange}
            sortBy={filters?.orderBy || TAvailableSorts[0]}
            setSortBy={handleSortChange}
          />
        </div>
      </div>
    </>
  );
};

export default Body;
