import { ReactElement, useCallback, useMemo, useState, VFC } from 'react';

import nftActionsTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { ArtCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { RequestStatus, TAvailableSorts, TokenFull, TSort, TSortDirs } from 'types';

interface IPreviewExploreNFTs {
  cardsData: TokenFull[];
  pages: number;
  skeleton?: ReactElement[];
  onLoadMore?: () => void;
}

const sortMap = {
  price: 'price',
  date: 'createdAt',
} as const;

const sortCallback = (field: keyof typeof sortMap, dir: TSortDirs) => {
  return (a: TokenFull, b: TokenFull) => {
    const f = sortMap[field];
    switch (dir) {
      case 'asc': {
        if (field === 'date') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return new Date(a[f]).getTime() - new Date(b[f]).getTime();
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return a[f] - b[f];
      }
      case 'desc': {
        if (field === 'date') {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return new Date(b[f]).getTime() - new Date(a[f]).getTime();
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return b[f] - a[f];
      }
      default:
        return 0;
    }
  };
};

const PreviewExploreNFTs: VFC<IPreviewExploreNFTs> = ({
  cardsData,
  skeleton = [],
  pages,
  onLoadMore,
}) => {
  const [sortBy, setSortBy] = useState(TAvailableSorts[0]);
  const [auction, setAuction] = useState(false);

  const { [nftActionsTypes.SEARCH_NFTS]: fetchingNFT } = useShallowSelector(uiSelector.getUI);
  const [currentPage, setCurrentPage] = useState(1);

  const elements = useMemo(() => {
    const sorted = [...cardsData];
    const { field, dir } = sortBy;
    if (field && dir) {
      sorted.sort(sortCallback(field as any, dir));
    }
    return sorted
      .filter((e) => {
        if (auction) {
          return e.isAucSelling;
        }
        return e;
      })
      .map((card) => (
        <ArtCard
          key={card.id}
          artId={String(card.id)}
          imageMain={card.media || ''}
          name={card.name}
          price={card.price}
          USD_price={card.usdPrice}
          asset=""
          author={card.creator.name || ''}
          authorAvatar={card.creator.avatar || ''}
          authorId={card.creator.id}
          isLiked={card.isLiked}
          likesNumber={card.likeCount}
          inStockNumber={card.available}
        />
      ));
  }, [auction, cardsData, sortBy]);

  const onSortClick = useCallback((sort: TSort) => setSortBy(sort), []);
  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      onLoadMore?.();
      setCurrentPage(page);
    },
    [onLoadMore],
  );
  const onAuctionClick = useCallback(() => setAuction(!auction), [auction]);

  return (
    <NFTList
      elements={fetchingNFT === RequestStatus.REQUEST ? skeleton : elements}
      sortBy={sortBy}
      onSortClick={onSortClick}
      onLoadMore={onLoadMoreClick}
      auction={auction}
      onAuctionClick={onAuctionClick}
      currentPage={currentPage}
      pages={pages}
      isLoading={fetchingNFT === RequestStatus.REQUEST}
    />
  );
};

export default PreviewExploreNFTs;
