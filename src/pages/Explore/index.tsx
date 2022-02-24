import { useCallback, useState, VFC } from 'react';

import cx from 'classnames';

import {
  ArtCard,
  ArtCardSkeleton,
  Button,
  Checkbox,
  Dropdown,
  H1,
  TabLookingComponent,
} from 'components';

import { Filters, Labels } from './components';

import styles from './styles.module.scss';
import mock from 'mock';

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
const collections = ['Collection1', 'Collection2', 'Collection3', 'Collection4', 'Collection5'];
const types = ['Single NFT', 'Multiple NFT'];
const sortings = ['Price: Low to High', 'Price: High to Low ', 'Date: Last', 'Date: New'];

const Explore: VFC = () => {
  const [checkedCategory, setCheckedCategory] = useState(categories[0].key);
  const [collection, setCollection] = useState(collections[0]);
  const [type, setType] = useState(types[0]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [isAuctionOnly, setIsAuctionOnly] = useState(false);
  const [sortBy, setSortBy] = useState(sortings[0]);
  const [page, setPage] = useState(1);

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

  return (
    <div className={styles.explore}>
      <H1 align="center" className={styles.title}>
        Skins
      </H1>
      <TabLookingComponent
        tabs={categories}
        wrapClassName={styles.categories}
        action={(value) => handleClickCategory(value)}
        activeTab={checkedCategory}
        tabClassName={styles.category}
      />
      <div className={styles.container}>
        <Filters
          collection={collection}
          setCollection={setCollection}
          collections={collections}
          type={type}
          setType={setType}
          types={types}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          setIsApplied={setIsApplied}
        />
        <div className={styles.filters}>
          {isApplied && (
            <Labels
              setDefaultFilters={() => setIsApplied(false)}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              activeCollection={collection}
              setActiveCollection={setCollection}
              type={type}
              setType={setType}
            />
          )}
        </div>
        <div className={styles.sorting}>
          <Checkbox
            value={isAuctionOnly}
            onChange={() => setIsAuctionOnly(!isAuctionOnly)}
            content="Auction"
          />
          <Dropdown
            className={styles.sortingDropdown}
            options={sortings}
            value={sortBy}
            setValue={setSortBy}
          />
        </div>
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
          <Button color="outline">Load More</Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
