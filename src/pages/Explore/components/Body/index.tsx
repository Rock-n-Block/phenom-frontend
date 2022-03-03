import { useCallback, useEffect, useState, VFC } from 'react';
import { useTranslation } from 'react-i18next';

import cx from 'classnames';
import mock from 'mock';

import { ArtCard, ArtCardSkeleton, Button, TabLookingComponent } from 'components';

import { Filters } from './components';

import styles from './styles.module.scss';

const categories = [
  {
    title: 'Category №1',
    key: 'category_1',
  },
  {
    title: 'Category №2',
    key: 'category_2',
  },
  {
    title: 'Category №3',
    key: 'category_3',
  },
  {
    title: 'Category №4',
    key: 'category_4',
  },
  {
    title: 'Category №5',
    key: 'category_5',
  },
];
const Body: VFC = () => {
  const { t } = useTranslation('Explore');
  const [checkedCategory, setCheckedCategory] = useState(categories[0].key);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  const handleClickCategory = useCallback((value: string) => {
    setPage(1);
    setCheckedCategory(value);
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
      USD_price: 22.03,
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
      USD_price: 22.03,
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
      USD_price: 22.03,
    },
  ];

  useEffect(() => {
    // call saga to fetch new nfts

    console.log({ page, checkedCategory, filters });
  }, [page, checkedCategory, filters]);
  return (
    <>
      <TabLookingComponent
        tabs={categories}
        wrapClassName={styles.categories}
        action={(value) => handleClickCategory(value)}
        activeTab={checkedCategory}
        tabClassName={styles.category}
      />
      <div className={styles.container}>
        <Filters filterCategory={checkedCategory} onFiltersChange={setFilters} />
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
            {t('Filters.LoadMore')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Body;
