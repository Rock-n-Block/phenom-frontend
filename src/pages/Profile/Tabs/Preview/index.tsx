import { ReactElement, useCallback, useEffect, useMemo, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { getLikedNFTs, searchNfts } from 'store/nfts/actions';
import nftActionsTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { ArtCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { RequestStatus, TAvailableSorts, TokenFull, TSort } from 'types';

type TFetchNames = 'owned' | 'forSale' | 'sold' | 'bided' | 'favorites';
interface IPreviewProfileNFTs {
  cardsData: TokenFull[];
  id: number | string;
  pages: number;
  skeleton?: ReactElement[];
  withAuction?: boolean;
  fetchName: TFetchNames;
}

const PreviewProfileNFTs: VFC<IPreviewProfileNFTs> = ({
  cardsData,
  skeleton,
  withAuction = false,
  fetchName,
  id,
  pages,
}) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(TAvailableSorts[0]);
  const [auction, setAuction] = useState(false);

  const network = useShallowSelector(userSelector.getProp('chain'));
  const { [nftActionsTypes.GET_LIKED]: fetchingLiked, [nftActionsTypes.SEARCH_NFTS]: fetchingNFT } =
    useShallowSelector(uiSelector.getUI);
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
          asset=""
          author={card.creator.name || ''}
          authorAvatar={card.creator.avatar || ''}
          authorId={card.creator.id}
        />
      )),
    [cardsData],
  );

  const fetchNFTs = useCallback(
    (name: TFetchNames, page: number) => {
      switch (name) {
        case 'owned': {
          dispatch(
            searchNfts({ requestData: { owner: id, type: 'items', page }, shouldConcat: true }),
          );
          break;
        }
        case 'forSale': {
          dispatch(
            searchNfts({
              requestData: { owner: id, type: 'items', page, on_sale: true },
              shouldConcat: true,
            }),
          );
          break;
        }
        case 'sold': {
          dispatch(
            searchNfts({
              requestData: { owner: id, type: 'items', page, sold_by: id },
              shouldConcat: true,
            }),
          );
          break;
        }
        case 'bided': {
          dispatch(
            searchNfts({
              requestData: { owner: id, type: 'items', page, bids_by: id },
              shouldConcat: true,
            }),
          );
          break;
        }
        case 'favorites': {
          dispatch(
            getLikedNFTs({
              userId: id,
              page,
              network,
              shouldConcat: true,
            }),
          );
          break;
        }
        default:
          break;
      }
    },
    [dispatch, id, network],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchNFTs(fetchName, 1);
  }, [fetchNFTs, fetchName]);

  const onSortClick = useCallback((sort: TSort) => setSortBy(sort), []);
  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      fetchNFTs(fetchName, page);
      setCurrentPage(page);
    },
    [fetchNFTs, fetchName],
  );
  const onAuctionClick = useCallback(() => setAuction(!auction), [auction]);

  return (
    <NFTList
      elements={skeleton || elements}
      sortBy={sortBy}
      onSortClick={onSortClick}
      onLoadMore={onLoadMoreClick}
      auction={auction}
      onAuctionClick={withAuction ? onAuctionClick : undefined}
      currentPage={currentPage}
      pages={pages}
      isLoading={fetchingLiked === RequestStatus.REQUEST || fetchingNFT === RequestStatus.REQUEST}
    />
  );
};

export default PreviewProfileNFTs;
