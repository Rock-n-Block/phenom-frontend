import { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getCategories } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';

import cx from 'classnames';
import { useLanguage } from 'context';
import mock from 'mock';

import { ArtCard, ArtCardSkeleton, Button, TabLookingComponent } from 'components';

import { Filters } from './components';

import { useShallowSelector } from 'hooks';
import { Categories } from 'types';

import styles from './styles.module.scss';

const Body: VFC = () => {
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const params = useParams();
  const activeCategory = useMemo(() => params.filterValue as Categories, [params.filterValue]);
  const tags = useMemo(() => {
    let initialArray: any = [];

    if (activeCategory === Categories.allCategories)
      initialArray = categories?.reduce(
        (result: any, currentCategory: any) => [...result, ...currentCategory.tags],
        initialArray,
      );

    if (activeCategory !== Categories.allCategories) {
      categories?.forEach((currentCategory: any) => {
        if (activeCategory === currentCategory.name) {
          initialArray = [...currentCategory.tags];
        }
      });
    }
    return initialArray || [];
  }, [activeCategory, categories]);
  console.log(tags);

  const [activeTag, setActiveTag] = useState(tags[0]?.name || '');

  useEffect(() => {
    if (tags[0]?.name) {
      setActiveTag(tags[0].name);
    }
  }, [tags]);

  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const handleClickCategory = useCallback((value) => {
    setPage(1);
    setActiveTag(value);
  }, []);

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

    console.log({ page, activeCategory, filters });
  }, [page, activeCategory, filters]);
  return (
    <>
      <TabLookingComponent
        tabs={tags}
        wrapClassName={styles.categories}
        action={(value) => handleClickCategory(value)}
        activeTab={activeTag}
        tabClassName={styles.category}
      />
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
                if (isNftsLoading && page === 1) {
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
            {isNftsLoading && page >= 2 && (
              <>
                <ArtCardSkeleton />
                <ArtCardSkeleton />
                <ArtCardSkeleton />
              </>
            )}
          </div>
        </div>
        <div className={styles.load}>
          <Button color="outline" className={styles.loadBtn}>
            {t('Explore:Filters.LoadMore')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Body;
