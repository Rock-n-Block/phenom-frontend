import { useEffect, useMemo, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import mock from 'mock';

import { Text } from 'components';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import { useGetUserAccessForNft, useWindowSize } from 'hooks';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const [nft, setNft] = useState<any>({});
  const { width } = useWindowSize();

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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNft(mock.nftCard[id]);
  }, [id]);
  console.log(nft)
  return (
    <div className={styles.nftCard}>
      {isDesktop ? (
        <>
          <div className={styles.left}>
            <div className={styles.nftCardImgWrapper}>
              {(nft.is_auc_selling || nft.is_timed_auc_selling) && (
                <div className={styles.auction}>
                  <Text color="white">Auction</Text>
                </div>
              )}
              <img src={nft.img} alt="nftCard" className={styles.nftCardImg} />
            </div>
            <PropsAndDescr properties={nft.properties} description={nft.description} />
          </div>
          <div className={styles.right}>
            <NameAndLike
              name={nft.name}
              likeCount={nft.likes_count}
              artId={nft.id}
              inStockNumber={nft.available}
            />
            {(isUserCanEndAuction ||
              isUserCanBuyNft ||
              isUserCanEnterInAuction ||
              isUserCanPutOnSale ||
              isUserCanRemoveFromSale ||
              isUserCanChangePrice) && (
              <Payment
                nft={nft}
                isUserCanEndAuction={isUserCanEndAuction}
                isUserCanBuyNft={isUserCanBuyNft}
                isUserCanEnterInAuction={isUserCanEnterInAuction}
                isUserCanPutOnSale={isUserCanPutOnSale}
                isOwner={isOwner}
                isUserCanRemoveFromSale={isUserCanRemoveFromSale}
                isUserCanChangePrice={isUserCanChangePrice}
              />
            )}
            {nft.creator && nft.owners && (
              <OwnersAndCreators
                creator={nft.creator}
                owners={nft.owners}
                collection={nft.collection}
              />
            )}
          </div>
        </>
      ) : (
        <div className={styles.column}>
          <NameAndLike
            name={nft.name}
            likeCount={nft.likes_count}
            artId={nft.id}
            inStockNumber={nft.in_stock_number}
          />
          <div className={styles.nftCardImgWrapper}>
            {(nft?.is_auc_selling || nft?.is_timed_auc_selling) && (
              <div className={styles.auction}>
                <Text color="white">Auction</Text>
              </div>
            )}
            <img src={nft.img} alt="nftCard" className={styles.nftCardImg} />
          </div>
          {(isUserCanEndAuction ||
            isUserCanBuyNft ||
            isUserCanEnterInAuction ||
            isUserCanPutOnSale ||
            isUserCanRemoveFromSale ||
            isUserCanChangePrice) && (
            <Payment
              nft={nft}
              isUserCanEndAuction={isUserCanEndAuction}
              isUserCanBuyNft={isUserCanBuyNft}
              isUserCanEnterInAuction={isUserCanEnterInAuction}
              isUserCanPutOnSale={isUserCanPutOnSale}
              isOwner={isOwner}
              isUserCanRemoveFromSale={isUserCanRemoveFromSale}
              isUserCanChangePrice={isUserCanChangePrice}
            />
          )}
          <PropsAndDescr properties={nft.properties} description={nft.description} />

          {nft.creator && nft.owners && (
            <OwnersAndCreators
              creator={nft.creator}
              owners={nft.owners}
              collection={nft.collection}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default NFTCard;
