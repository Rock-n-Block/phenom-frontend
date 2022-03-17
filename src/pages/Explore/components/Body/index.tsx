import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { getCategories, searchNfts } from 'store/nfts/actions';
import { clearNfts } from 'store/nfts/reducer';
import nftSelector from 'store/nfts/selectors';

import cx from 'classnames';
import { useLanguage } from 'context';
import { debounce } from 'lodash';

import { ArtCard, ArtCardSkeleton, Button, TabLookingComponent } from 'components';
import { ITab } from 'components/TabLookingComponent';

import { Filters } from './components';

import { DEBOUNCE_DELAY_100, DEFAULT_CURRENCY } from 'appConstants';
import { useGetTags, useShallowSelector } from 'hooks';
import { CategoryName, TNullable } from 'types';

import styles from './styles.module.scss';

interface IBody {
  activeCategory: CategoryName;
}

const Body: VFC<IBody> = ({ activeCategory }) => {
  const pageChangeScrollAnchor = useRef<TNullable<HTMLDivElement>>(null);
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const nftCards = useShallowSelector(nftSelector.getProp('nfts'));
  const { tags, activeTag, handleSetActiveTag } = useGetTags(activeCategory, categories);

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
      category: string,
      activetags: string,
      // TODO: types filters
      filtersData: any,
      page: number,
      shouldConcat?: boolean,
    ) => {
      const requestData = {
        type: 'items',
        categories: categories?.filter((categoryOption: any) => categoryOption.name === category)[0]
          ?.id,
        tags: tags?.filter((tagsOption: any) => tagsOption.name === activetags)[0]?.id,
        page,
        collections: filtersData?.collections?.join(','),
        max_price: filtersData?.maxPrice,
        min_price: filtersData?.minPrice,
        on_auc_sale: filtersData?.isAuctionOnly,
        order_by: filtersData?.orderBy?.label,
      };
      dispatch(searchNfts({ requestData, shouldConcat }));
    },
    [categories, dispatch, tags],
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

  const isNftsLoading = false;

  useEffect(() => {
    // call saga to fetch new nfts

    console.log('filters', filters);
  }, [filters]);

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
                const {
                  artId,
                  name,
                  price,
                  media,
                  currency,
                  author,
                  authorAvatar,
                  authorId,
                  bids,
                  isAuction,
                  USD_price,
                } = artCard;
                return (
                  <ArtCard
                    artId={artId}
                    name={name}
                    price={price}
                    imageMain={media}
                    asset={currency?.symbol || DEFAULT_CURRENCY}
                    author={author}
                    authorAvatar={authorAvatar}
                    authorId={authorId}
                    bids={bids}
                    isAuction={isAuction}
                    USD_price={USD_price}
                    likeAction={(id: any) => {
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
        <div className={styles.load}>
          <Button
            color="outline"
            className={styles.loadBtn}
            onClick={() => handleLoadMore(currentPage + 1)}
          >
            {t('Explore:Filters.LoadMore')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Body;
