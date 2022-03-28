import { ReactElement, useCallback, useMemo, useState, VFC } from 'react';

import nftActionsTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { ArtCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { RequestStatus, TokenFull, TSort } from 'types';
import { DEFAULT_CURRENCY } from 'appConstants';

interface IPreviewExploreNFTs {
  cardsData: TokenFull[];
  pages: number;
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
  auction,
  setAuction,
  sortBy,
  setSortBy,
  onLoadMore,
}) => {
  const { [nftActionsTypes.SEARCH_NFTS]: fetchingNFT } = useShallowSelector(uiSelector.getUI);
  const [currentPage, setCurrentPage] = useState(1);

  const elements = useMemo(
    () =>
      cardsData.map((card) => (
        <ArtCard
          key={card.id}
          artId={String(card.id)}
          imageMain={card.media || ''}
          name={card.name}
          price={card.price}
          USD_price={card.usdPrice}
          asset={card.currency?.symbol || DEFAULT_CURRENCY}
          author={card.creator.name || ''}
          authorAvatar={card.creator.avatar || ''}
          authorId={card.creator.id}
          isLiked={card.isLiked}
          likesNumber={card.likeCount}
          inStockNumber={card.available}
        />
      )),
    [cardsData],
  );

  const onSortClick = useCallback((sort: TSort) => setSortBy?.(sort), [setSortBy]);
  const onLoadMoreClick = useCallback(
    (page: number) => {
      onLoadMore?.(page);
      setCurrentPage(page);
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
