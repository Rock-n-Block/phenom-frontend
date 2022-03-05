import { ReactElement, useCallback, useMemo, useState, VFC } from 'react';

import { ArtCard, NFTList } from 'components';

import { NFT, TAvailableSorts, TSort } from 'types';

interface IPreviewProfileNFTs {
  cardsData: NFT[];
  skeleton?: ReactElement[];
  withAuction?: boolean;
}

const PreviewProfileNFTs: VFC<IPreviewProfileNFTs> = ({
  cardsData,
  skeleton,
  withAuction = false,
}) => {
  const [sortBy, setSortBy] = useState(TAvailableSorts[0]);
  const [auction, setAuction] = useState(false);
  const elements = useMemo(
    () => cardsData.map((card) => <ArtCard key={card.artId} imageMain={card.img} {...card} />),
    [cardsData],
  );
  const onSortClick = useCallback((sort: TSort) => setSortBy(sort), []);
  const onLoadMoreClick = useCallback(() => console.log('loading'), []);
  const onAuctionClick = useCallback(() => setAuction(!auction), [auction]);
  return (
    <NFTList
      elements={skeleton || elements}
      sortBy={sortBy}
      onSortClick={onSortClick}
      onLoadMore={onLoadMoreClick}
      auction={auction}
      onAuctionClick={withAuction ? onAuctionClick : undefined}
    />
  );
};

export default PreviewProfileNFTs;
