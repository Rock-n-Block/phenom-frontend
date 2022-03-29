import { ReactElement, useCallback, useMemo, VFC } from 'react';

import nftActionsTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { ArtCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { RequestStatus, TokenFull, TSort } from 'types';
import { DEFAULT_CURRENCY } from 'appConstants';

interface IPreviewExploreNFTs {
  cardsData: TokenFull[];
  pages: number;
  currentPage: number;
  skeleton?: ReactElement[];
  auction?: boolean;
  setAuction?: (value: boolean) => void;
  sortBy?: TSort;
  setSortBy?: (sort: TSort) => void;
  onLoadMore?: (page: number) => void;
}

const PreviewExploreNFTs: VFC<IPreviewExploreNFTs> = ({
  cardsData,
  skeleton = [],
  pages,
  currentPage,
  auction,
  setAuction,
  sortBy,
  setSortBy,
  onLoadMore,
}) => {
  const { [nftActionsTypes.SEARCH_NFTS]: fetchingNFT } = useShallowSelector(uiSelector.getUI);

  const elements = useMemo(
    () =>
      cardsData.map((card) => (
        <ArtCard
          key={card.id}
          artId={String(card.id)}
          imageMain={card.media || ''}
          name={card.name}
          price={card.price || card.highestBid?.amount || card.minimalBid}
          USD_price={card.usdPrice || card.highestBidUsd || card.minimalBidUsd || 0}
          inStockNumber={card.available}
          asset={card.currency?.symbol || DEFAULT_CURRENCY}
          author={card.creator.name || ''}
          authorAvatar={card.creator.avatar || ''}
          authorId={card.creator.id}
          isLiked={card.isLiked}
          likesNumber={card.likeCount}
        />
      )),
    [cardsData],
  );

  const onSortClick = useCallback((sort: TSort) => setSortBy?.(sort), [setSortBy]);
  const onLoadMoreClick = useCallback(
    (page: number) => {
      onLoadMore?.(page);
    },
    [onLoadMore],
  );
  const onAuctionClick = useCallback(() => setAuction?.(!auction), [auction, setAuction]);

  return (
    <NFTList
      elements={fetchingNFT === RequestStatus.REQUEST ? [...elements, ...skeleton] : elements}
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
