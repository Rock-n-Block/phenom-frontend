import { useCallback, useEffect, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { getCategories, searchNfts } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';

import cx from 'classnames';
import { useLanguage } from 'context';
import mock from 'mock';

import { ArtCard, ArtCardSkeleton, Button, TabLookingComponent } from 'components';
import { ITab } from 'components/TabLookingComponent';

import { Filters } from './components';

import { useGetTags, useShallowSelector } from 'hooks';
import { CategoryName } from 'types';

import styles from './styles.module.scss';

interface IBody {
  activeCategory: CategoryName;
}

const Body: VFC<IBody> = ({ activeCategory }) => {
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const collections = useShallowSelector(nftSelector.getProp('collections'));
  console.log('collections', collections);
  const { tags, activeTag, handleSetActiveTag } = useGetTags(activeCategory, categories);

  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  const handleSearchCollections = useCallback(() => {
    const requestData = { type: 'collections', page: 1 };
    dispatch(searchNfts({ requestData }));
  }, [dispatch]);

  const handleSearchNfts = useCallback(
    (
      category: string,
      // TODO: types filters
      filtersData: any,
      page: number,
      shouldConcat?: boolean,
    ) => {
      console.log('filtersData', filtersData);
      const requestData = {
        categories: category,
        page,
        rarity: filtersData?.rarity?.join(','),
        attributes: JSON.stringify(filtersData?.attributes),
        on_timed_auc_sale: filtersData.isAuction,
        order_by: filtersData?.orderBy,
      };
      dispatch(searchNfts({ requestData, shouldConcat }));
    },
    [dispatch],
  );

  const handleLoadMore = useCallback(
    (page: number, shouldConcat = false) => {
      handleSearchNfts(activeCategory, filters, page, shouldConcat);
    },
    [activeCategory, filters, handleSearchNfts],
  );

  useEffect(() => {
    handleSearchNfts(activeCategory, filters, 1);
    setCurrentPage(1);
  }, [activeCategory, filters, handleSearchNfts]);

  useEffect(() => {
    handleGetCategories();
    handleSearchCollections();
  }, [handleGetCategories, handleSearchCollections]);

  const handleClickCategory = useCallback(
    (value) => {
      setCurrentPage(1);
      handleSetActiveTag(value);
    },
    [handleSetActiveTag],
  );

  const isNftsLoading = false;

  const nftCards = [
    {
      artId: '0342348',
      name: 'Nft name',
      price: '54266.7',
      img: mock.trending,
      asset: 'PHETA',
      author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      authorAvatar: mock.user,
      authorId: 1,
      bids: [1],
      isAuction: true,
      USD_price: '22.03',
    },
    {
      artId: '0342348',
      name: 'Nft name',
      price: '54266.7',
      img: mock.trending,
      asset: 'PHETA',
      author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      authorAvatar: mock.user,
      authorId: 1,
      isAuction: false,
      USD_price: '22.03',
    },
    {
      artId: '0342348',
      name: 'Nft name',
      price: '54266.7',
      img: mock.trending,
      asset: 'PHETA',
      author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
      authorAvatar: mock.user,
      authorId: 1,
      bids: [],
      isAuction: true,
      USD_price: '22.03',
    },
  ];

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
          activeTab={activeTag}
          tabClassName={styles.category}
        />
      )}

      <div className={styles.container}>
        <Filters filterCategory={activeCategory} onFiltersChange={setFilters} />
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
                  img,
                  asset,
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
                    imageMain={img}
                    asset={asset}
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
