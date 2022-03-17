import { useEffect, useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getDetailedNft } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearDetailedNft } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import { Loader, Text } from 'components';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import { useGetUserAccessForNft, useShallowSelector, useWindowSize } from 'hooks';
import { RequestStatus } from 'types';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const detailedNft = useShallowSelector(nftsSelector.getProp('detailedNft'));

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
  } = useGetUserAccessForNft(detailedNft, 1);

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
                  isLiked={detailedNft?.isLiked}
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
                isLiked={detailedNft?.isLiked}
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
