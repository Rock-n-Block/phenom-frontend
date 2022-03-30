import { useEffect, useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getDetailedNft } from 'store/nfts/actions';
import actionTypes from 'store/nfts/actionTypes';
import { clearDetailedNft } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import cn from 'classnames';

import { getPreviewer, Loader, Text } from 'components';
import { IAudioPreview } from 'components/Preview/AudioPreview';
import { IImagePreview } from 'components/Preview/ImagePreview';
import { IThreePreview } from 'components/Preview/ThreePreview';
import { IVideoPreview } from 'components/Preview/VideoPreview';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import { useGetUserAccessForNft, useShallowSelector, useWindowSize } from 'hooks';
import { Ownership, RequestStatus } from 'types';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const detailedNft = useShallowSelector(nftsSelector.getProp('detailedNft'));
  const userId = useShallowSelector(userSelector.getProp('id'));

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
  } = useGetUserAccessForNft(detailedNft, String(userId));

  const props = useMemo(() => {
    const AudioProps: IAudioPreview = {
      src: detailedNft?.animation || '',
      previewSrc: detailedNft?.media || '',
      audioType: 'mp3',
    };
    const VideoProps: IVideoPreview = {
      src: detailedNft?.animation || '',
      previewSrc: detailedNft?.media || '',
      videoType: 'mp4',
    };
    const ImageProps: IImagePreview & { previewSrc: string } = {
      src: detailedNft?.media || '',
      previewSrc: '',
    };
    const IThreeProps: IThreePreview & { previewSrc: string } = {
      src: detailedNft?.animation || '',
      name: 'three-preview',
      threeType: 'glb',
      previewSrc: detailedNft?.media || '',
    };
    return {
      audio: AudioProps,
      video: VideoProps,
      image: ImageProps,
      threeD: IThreeProps,
    };
  }, [detailedNft]);

  const { PreviewComponent, previewType } = useMemo(
    () => getPreviewer(detailedNft?.media || '', props, detailedNft?.format || 'image'),
    [detailedNft, props],
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
                <div
                  className={cn(styles.nftCardImgWrapper, {
                    [styles.threeD]: previewType === 'threeD',
                  })}
                >
                  {(detailedNft?.isAucSelling || detailedNft?.isTimedAucSelling) && (
                    <div className={styles.auction}>
                      <Text color="white">Auction</Text>
                    </div>
                  )}
                  {detailedNft?.media ? (
                    PreviewComponent
                  ) : (
                    <div className={styles.noImage}>
                      <Loader backgroundColor="purple" />
                    </div>
                  )}
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
                  youOwn={
                    detailedNft?.owners?.filter(
                      (owner: Ownership) => String(owner.url) === String(userId),
                    )[0]?.quantity
                  }
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
                    userId={userId}
                  />
                )}
                {detailedNft?.creator && detailedNft?.owners && (
                  <OwnersAndCreators
                    creator={detailedNft?.creator}
                    owners={detailedNft?.owners}
                    collection={!detailedNft?.collection.isDefault ? detailedNft?.collection : null}
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
                inStockNumber={detailedNft?.available}
                isLiked={detailedNft?.isLiked}
                youOwn={
                  detailedNft?.owners?.filter(
                    (owner: Ownership) => String(owner.url) === String(userId),
                  )[0]?.quantity
                }
              />
              <div
                className={cn(styles.nftCardImgWrapper, {
                  [styles.threeD]: previewType === 'threeD',
                })}
              >
                {(detailedNft?.isAucSelling || detailedNft?.isTimedAucSelling) && (
                  <div className={styles.auction}>
                    <Text color="white">Auction</Text>
                  </div>
                )}
                {PreviewComponent}
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
                  userId={userId}
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
                  collection={!detailedNft?.collection.isDefault ? detailedNft?.collection : null}
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
