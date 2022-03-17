import { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { bid, buy, getDetailedNft, setOnAuction } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearDetailedNft } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { useWalletConnectContext } from 'context';

import { Loader, Text } from 'components';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import { useGetUserAccessForNft, useShallowSelector, useWindowSize } from 'hooks';
import { RequestStatus } from 'types';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const [nft] = useState<any>({});
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const detailedNft = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const { walletService } = useWalletConnectContext();

  const { [actionTypes.GET_DETAILED_NFT]: getDetailedNftRequestStatus } = useShallowSelector(
    uiSelector.getUI,
  );

  const skeletonLoader = useMemo(
    () => getDetailedNftRequestStatus === RequestStatus.REQUEST,
    [getDetailedNftRequestStatus],
  );

  const isDesktop = useMemo(() => +width >= 1023, [width]);

  const {
    isUserCanEndAuction,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isOwner,
    isUserCanRemoveFromSale,
    isUserCanChangePrice,
  } = useGetUserAccessForNft(nft, 1);

  const handleBuy = useCallback(() => {
    if (detailedNft) {
      dispatch(
        buy({
          id: detailedNft?.id || 0,
          amount: detailedNft?.price || 0,
          sellerId: 0,
          web3Provider: walletService.Web3(),
        }),
      );
    }
  }, [detailedNft, dispatch, walletService]);

  const handleSetOnAuction = useCallback(
    (minimalBid: number | string, currency: string, auctionDuration?: number) => () => {
      if (detailedNft) {
        dispatch(
          setOnAuction({
            id: detailedNft?.id || 0,
            internalId: detailedNft.internalId || 0,
            minimalBid,
            currency,
            auctionDuration,
            web3Provider: walletService.Web3(),
          }),
        );
      }
    },
    [detailedNft, dispatch, walletService],
  );

  const handleBid = useCallback(
    (amount: number | string, currency: string) => {
      dispatch(
        bid({
          id: detailedNft?.id || 0,
          amount,
          currency,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [detailedNft, dispatch, walletService],
  );

  useEffect(() => {
    if (id) {
      dispatch(
        getDetailedNft({
          id,
        }),
      );
    }

    return () => {
      dispatch(clearDetailedNft());
    };
  }, [dispatch, id]);

  return (
    <div className={styles.nftCard}>
      {skeletonLoader || !detailedNft ? (
        <Loader backgroundColor="purple" className={styles.loader} />
      ) : (
        <>
          {isDesktop ? (
            <>
              <div className={styles.left}>
                <div className={styles.nftCardImgWrapper}>
                  {(detailedNft?.isAucSelling || detailedNft?.is_timed_auc_selling) && (
                    <div className={styles.auction}>
                      <Text color="white">Auction</Text>
                    </div>
                  )}
                  <img src={detailedNft?.media} alt="nftCard" className={styles.nftCardImg} />
                </div>
                <PropsAndDescr
                  properties={detailedNft?.properties}
                  description={detailedNft?.description}
                />
              </div>
              <div className={styles.right}>
                <NameAndLike
                  name={detailedNft?.name}
                  likeCount={detailedNft?.likeCount || 0}
                  artId={detailedNft?.id || +id}
                  inStockNumber={detailedNft?.available}
                />
                {(isUserCanEndAuction ||
                  isUserCanBuyNft ||
                  isUserCanEnterInAuction ||
                  isUserCanPutOnSale ||
                  isUserCanRemoveFromSale ||
                  isUserCanChangePrice) && (
                  <Payment
                    nft={detailedNft}
                    isUserCanEndAuction={isUserCanEndAuction}
                    isUserCanBuyNft={isUserCanBuyNft}
                    isUserCanEnterInAuction={isUserCanEnterInAuction}
                    isUserCanPutOnSale={isUserCanPutOnSale}
                    isOwner={isOwner}
                    isUserCanRemoveFromSale={isUserCanRemoveFromSale}
                    isUserCanChangePrice={isUserCanChangePrice}
                    handleBuy={handleBuy}
                    handleSetOnAuction={handleSetOnAuction}
                    handleBid={handleBid}
                  />
                )}
                {detailedNft?.creator && detailedNft?.owners && (
                  <OwnersAndCreators
                    creator={detailedNft?.creator}
                    owners={detailedNft?.owners}
                    collection={detailedNft?.collection}
                  />
                )}
              </div>
            </>
          ) : (
            <div className={styles.column}>
              <NameAndLike
                name={detailedNft?.name}
                likeCount={detailedNft?.likeCount || 0}
                artId={detailedNft?.id || +id}
                inStockNumber={detailedNft?.in_stock_number}
              />
              <div className={styles.nftCardImgWrapper}>
                {(detailedNft?.isAucSelling || detailedNft?.is_timed_auc_selling) && (
                  <div className={styles.auction}>
                    <Text color="white">Auction</Text>
                  </div>
                )}
                <img src={detailedNft?.media} alt="nftCard" className={styles.nftCardImg} />
              </div>
              {(isUserCanEndAuction ||
                isUserCanBuyNft ||
                isUserCanEnterInAuction ||
                isUserCanPutOnSale ||
                isUserCanRemoveFromSale ||
                isUserCanChangePrice) && (
                <Payment
                  nft={detailedNft}
                  isUserCanEndAuction={isUserCanEndAuction}
                  isUserCanBuyNft={isUserCanBuyNft}
                  isUserCanEnterInAuction={isUserCanEnterInAuction}
                  isUserCanPutOnSale={isUserCanPutOnSale}
                  isOwner={isOwner}
                  isUserCanRemoveFromSale={isUserCanRemoveFromSale}
                  isUserCanChangePrice={isUserCanChangePrice}
                  handleBuy={handleBuy}
                  handleSetOnAuction={handleSetOnAuction}
                  handleBid={handleBid}
                />
              )}
              <PropsAndDescr
                properties={detailedNft?.properties}
                description={detailedNft?.description}
              />

              {detailedNft?.creator && detailedNft?.owners && (
                <OwnersAndCreators
                  creator={detailedNft?.creator}
                  owners={detailedNft?.owners}
                  collection={detailedNft?.collection}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NFTCard;
