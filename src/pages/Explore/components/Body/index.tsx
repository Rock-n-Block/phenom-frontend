import { useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { getCategories, searchNfts } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearNfts } from 'store/nfts/reducer';
import nftSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import cx from 'classnames';
import { useLanguage } from 'context';
import { debounce } from 'lodash';

import { ArtCard, ArtCardSkeleton, Button, TabLookingComponent } from 'components';
import { ITab } from 'components/TabLookingComponent';

import { Filters } from './components';

import { DEBOUNCE_DELAY_100, DEFAULT_CURRENCY } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus, Tag, TNullable } from 'types';

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
  const totalPages = useShallowSelector(nftSelector.getProp('totalNftsPages'));
  const { [actionTypes.SEARCH_NFTS]: nftsRequestStatus } = useShallowSelector(uiSelector.getUI);
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleSearchNfts = useCallback(
    (
      category: any,
      activetags: string,
      // TODO: types filters
      filtersData: any,
      page: number,
      shouldConcat?: boolean,
    ) => {
      const requestData = {
        type: 'items',
        categories: category?.id,
        tags: activetags ? +activetags : undefined,
        page,
        collections: filtersData?.collections?.join(','),
        max_price: filtersData?.maxPrice,
        min_price: filtersData?.minPrice,
        on_auc_sale: filtersData?.isAuctionOnly,
        order_by: filtersData?.orderBy?.label,
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

  const isNftsLoading = useMemo(
    () => nftsRequestStatus === RequestStatus.REQUEST,
    [nftsRequestStatus],
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

        <div ref={pageChangeScrollAnchor} />
        <div className={styles.filterResults}>
          <div className={cx(styles.cards)}>
            {isNftsLoading && nftCards.length === 0 ? (
              <>
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
              </>
            ) : (
              nftCards.map((artCard: any) => {
                if (isNftsLoading && currentPage === 1) {
                  return <ArtCardSkeleton />;
                }
                const { id, name, price, media, currency, creator, bids, isAuction, USD_price } =
                  artCard;
                return (
                  <ArtCard
                    artId={id}
                    name={name}
                    price={price}
                    imageMain={media}
                    asset={currency?.symbol || DEFAULT_CURRENCY}
                    author={creator?.name || creator?.address}
                    authorAvatar={creator?.avatar}
                    authorId={creator?.id}
                    bids={bids}
                    isAuction={isAuction}
                    USD_price={USD_price}
                    likeAction={() => {
                      return id;
                    }}
                  />
                );
              })
            )}
            {isNftsLoading && currentPage >= 2 && (
              <>
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
              </>
            )}
          </div>
        </div>
        {currentPage < totalPages && (
          <div className={styles.load}>
            <Button
              color="outline"
              className={styles.loadBtn}
              onClick={() => handleLoadMore(currentPage + 1)}
            >
              {t('Explore:Filters.LoadMore')}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
