import { ReactElement, useCallback, useEffect, useMemo, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { searchNfts } from 'store/nfts/actions';
import nftActionsTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { ArtCard, NFTList } from 'components';
import { mapSortToRequest } from 'utils';

import { DEFAULT_CURRENCY } from 'appConstants';
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
  skeleton = [],
  withAuction = false,
  fetchName,
  id,
  pages,
}) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(TAvailableSorts[0]);
  const [auction, setAuction] = useState(false);

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
          price={card.price || card.highestBid?.amount || card.minimalBid}
          USD_price={card.usdPrice || card.highestBidUsd || card.minimalBidUsd || 0}
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

  useEffect(() => {
    setSortBy(TAvailableSorts[0]);
    setAuction(false);
  }, [fetchName]);

  const fetchNFTs = useCallback(
    (name: TFetchNames, page: number, shouldConcat = false) => {
      switch (name) {
        case 'owned': {
          dispatch(
            searchNfts({
              requestData: {
                owner: id,
                type: 'items',
                page,
                on_auc_sale: auction || undefined,
                order_by: mapSortToRequest(sortBy),
              },
              shouldConcat,
            }),
          );
          break;
        }
        case 'forSale': {
          dispatch(
            searchNfts({
              requestData: {
                owner: id,
                type: 'items',
                page,
                on_any_sale: true,
                on_auc_sale: auction || undefined,
                order_by: mapSortToRequest(sortBy),
              },
              shouldConcat,
            }),
          );
          break;
        }
        case 'sold': {
          dispatch(
            searchNfts({
              requestData: {
                owner: id,
                type: 'items',
                page,
                sold_by: id,
                on_auc_sale: auction || undefined,
                order_by: mapSortToRequest(sortBy),
              },
              shouldConcat,
            }),
          );
          break;
        }
        case 'bided': {
          dispatch(
            searchNfts({
              requestData: {
                owner: id,
                type: 'items',
                page,
                bids_by: id,
                on_auc_sale: auction || undefined,
                order_by: mapSortToRequest(sortBy),
              },
              shouldConcat,
            }),
          );
          break;
        }
        case 'favorites': {
          dispatch(
            searchNfts({
              requestData: {
                owner: id,
                type: 'items',
                page,
                liked_by: id,
                on_auc_sale: auction || undefined,
                order_by: mapSortToRequest(sortBy),
              },
              shouldConcat,
            }),
          );
          break;
        }
        default:
          break;
      }
    },
    [auction, dispatch, id, sortBy],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchNFTs(fetchName, 1);
  }, [fetchNFTs, fetchName]);

  const onSortClick = useCallback((sort: TSort) => setSortBy(sort), []);
  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      fetchNFTs(fetchName, page, true);
      setCurrentPage(page);
    },
    [fetchNFTs, fetchName],
  );
  const onAuctionClick = useCallback(() => setAuction(!auction), [auction]);

  return (
    <NFTList
      elements={
        fetchingLiked === RequestStatus.REQUEST || fetchingNFT === RequestStatus.REQUEST
          ? [...elements, ...skeleton]
          : elements
      }
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
