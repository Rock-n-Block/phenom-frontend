import { useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import mock from 'mock';
import moment from 'moment';

import { Text } from 'components';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import { useWindowSize } from 'hooks';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const [nft, setNft] = useState<any>({});
  const { width } = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNft(mock.nftCard[id]);
  }, [id]);

  useEffect(() => {
    if (width < 1023) {
      setIsDesktop(false);
    }

    if (width >= 1023) {
      setIsDesktop(true);
    }
  }, [width]);
  return (
    <div className={styles.nftCard}>
      {isDesktop ? (
        <>
          <div className={styles.left}>
            <div className={styles.nftCardImgWrapper}>
              {(nft.isAuction || nft.isTimedAuction) && (
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
              likeCount={nft.likeCount}
              artId={nft.id}
              inStockNumber={nft.inStockNumber}
            />
            <Payment
              standart={nft.standart}
              availableAmount={nft.inStockNumber}
              price={nft.price}
              USD_price={nft.USD_price}
              isTimedAuction={nft.isTimedAuction}
              isAuction={nft.isAuction}
              end_auction={nft.isTimedAuction && moment.now() / 1000}
            />
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
            likeCount={nft.likeCount}
            artId={nft.id}
            inStockNumber={nft.inStockNumber}
          />
          <div className={styles.nftCardImgWrapper}>
            {(nft.isAuction || nft.isTimedAuction) && (
              <div className={styles.auction}>
                <Text color="white">Auction</Text>
              </div>
            )}
            <img src={nft.img} alt="nftCard" className={styles.nftCardImg} />
          </div>
          <Payment
            standart={nft.standart}
            availableAmount={nft.inStockNumber}
            price={nft.price}
            USD_price={nft.USD_price}
            isTimedAuction={nft.isTimedAuction}
            isAuction={nft.isAuction}
            end_auction={nft.isTimedAuction && moment.now() / 1000}
          />
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
