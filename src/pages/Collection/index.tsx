import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchSingleCollection } from 'store/collections/actions';
import { clearCollections } from 'store/collections/reducer';
import collectionsSelector from 'store/collections/selectors';
import { searchNfts } from 'store/nfts/actions';
import actionsTypes from 'store/nfts/actionTypes';
import { clearNfts } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { ArtCard, ArtCardSkeleton, NFTList, Text } from 'components';
import { sliceString } from 'utils';

import { DEFAULT_CURRENCY } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus, TokenFull } from 'types';
import { GetSingleCollectionReq } from 'types/requests';

import styles from './styles.module.scss';

const Collection = () => {
  const dispatch = useDispatch();
  const { collectionId } = useParams<{ collectionId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const nfts = useShallowSelector(nftsSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftsSelector.getProp('totalPages'));
  const { [actionsTypes.SEARCH_NFTS]: fetchingNfts } = useShallowSelector(uiSelector.getUI);
  const collection = useShallowSelector(collectionsSelector.getProp('singleCollection'));
  const chain = useShallowSelector(userSelector.getProp('chain'));

  const handleSearchCollection = useCallback(() => {
    const requestData: GetSingleCollectionReq = { id: String(collectionId), network: chain };
    dispatch(searchSingleCollection(requestData));
  }, [chain, collectionId, dispatch]);

  const fetchNfts = useCallback(
    (page: number, shouldConcat = false) => {
      dispatch(
        searchNfts({
          requestData: { type: 'items', page, collections: String(collectionId) },
          shouldConcat,
        }),
      );
    },
    [collectionId, dispatch],
  );

  useEffect(() => {
    handleSearchCollection();
    setCurrentPage(1);
    fetchNfts(1);
  }, [dispatch, fetchNfts, handleSearchCollection]);

  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      fetchNfts(page, true);
      setCurrentPage(page);
    },
    [fetchNfts],
  );

  useEffect(
    () => () => {
      dispatch(clearCollections());
    },
    [dispatch],
  );

  useEffect(
    () => () => {
      dispatch(clearNfts());
    },
    [dispatch],
  );

  const elements = useMemo(
    () =>
      nfts.map((card: TokenFull) => (
        <ArtCard
          key={card.id}
          artId={card.id || 0}
          name={card.name}
          price={card.price || card.highestBid?.amount || card.minimalBid}
          imageMain={card.media || ''}
          asset={card?.currency?.symbol || DEFAULT_CURRENCY}
          author={card.creator?.name || card.creator?.address || ''}
          authorAvatar={card.creator?.avatar || ''}
          authorId={card.creator?.id}
          bids={card.bids}
          isAuction={card.isAucSelling || card.isTimedAucSelling}
          USD_price={card.usdPrice || card.highestBidUsd || card.minimalBidUsd || 0}
          inStockNumber={card.available}
        />
      )),
    [nfts],
  );

  const NFTsCardsSkeleton = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => new Array(6).fill(0).map((_, k) => <ArtCardSkeleton key={k} />),
    [],
  );
  return (
    <>
      <div className={styles.head}>
        <div className={styles.collection}>
          <div className={styles.avatarWrapper}>
            <img src={collection?.avatar} alt="collection" className={styles.avatar} />
          </div>
          <Text className={styles.name} tag="h2" weight="semibold">
            {collection?.name}
          </Text>
          <Text tag="span" weight="medium" className={styles.creator}>
            Created by{' '}
            <Text color="blue" tag="span">
              {collection?.creator?.displayName || sliceString(collection?.creator?.name || '')}
            </Text>
          </Text>
          <Text tag="span" weight="medium" className={styles.info}>
            Items
            <Text tag="span" color="blue">
              {' '}
              {collection?.tokensCount}
            </Text>
            <Text tag="span">, Floor price: </Text>
            <Text tag="span" color="blue">
              {collection?.floorPrice} {DEFAULT_CURRENCY}
            </Text>
          </Text>
        </div>
      </div>
      <NFTList
        elements={elements || NFTsCardsSkeleton}
        isLoading={fetchingNfts === RequestStatus.REQUEST}
        currentPage={currentPage}
        pages={totalPages}
        onLoadMore={onLoadMoreClick}
        className={styles.cards}
      />
    </>
  );
};

export default Collection;
