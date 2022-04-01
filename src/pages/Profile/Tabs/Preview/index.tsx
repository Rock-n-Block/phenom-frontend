import { ReactElement, useCallback, useEffect, useMemo, useRef, useState, VFC } from 'react';

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

const fetchDelay = 1000 * 60;

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

  const fetchTimer = useRef<NodeJS.Timer | null>(null);

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
          authorId={card.creator.url || ''}
          isLiked={card.isLiked}
          likesNumber={card.likeCount}
          inStockNumber={card.available}
          isAuction={card.isAucSelling || card.isTimedAucSelling}
          bids={card.bids}
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
                type: 'items',
                page,
                on_any_sale: id,
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
    fetchTimer.current = setInterval(() => {
      fetchNFTs(fetchName, 1);
    }, fetchDelay);

    return () => {
      if (fetchTimer.current) clearInterval(fetchTimer.current);
    };
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

  const returnedElements = useMemo(() => {
    let els;
    if (fetchingNFT === RequestStatus.REQUEST) {
      if (currentPage === 1) {
        els = skeleton;
      }
      if (currentPage > 1) {
        els = [...elements, ...skeleton];
      }
    }
    if (fetchingNFT !== RequestStatus.REQUEST) {
      els = elements;
    }
    return els;
  }, [currentPage, elements, fetchingNFT, skeleton]);
  return (
    <NFTList
      elements={[...(returnedElements || skeleton)]}
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
