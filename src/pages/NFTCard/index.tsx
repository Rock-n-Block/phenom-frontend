import { useEffect, useMemo, useState, VFC } from 'react';
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

  const isDesktop = useMemo(() => +width >= 1023, [width]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNft(mock.nftCard[id]);
  }, [id]);

  return (
    <div className={styles.nftCard}>
      {isDesktop ? (
        <>
          <div className={styles.left}>
            <div className={styles.nftCardImgWrapper}>
              {(nft.is_auction || nft.is_timed_auction) && (
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
              inStockNumber={nft.in_stock_number}
            />
            <Payment
              standart={nft.standart}
              availableAmount={nft.in_stock_number}
              price={nft.price}
              USD_price={nft.USD_price}
              isTimedAuction={nft.is_timed_auction}
              isAuction={nft.is_auction}
              end_auction={nft.is_timed_auction && moment.now() / 1000}
              isSelling={nft.is_selling}
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
            likeCount={nft.likes_count}
            artId={nft.id}
            inStockNumber={nft.in_stock_number}
          />
          <div className={styles.nftCardImgWrapper}>
            {(nft.is_auction || nft.is_timed_auction) && (
              <div className={styles.auction}>
                <Text color="white">Auction</Text>
              </div>
            )}
            <img src={nft.img} alt="nftCard" className={styles.nftCardImg} />
          </div>
          <Payment
            standart={nft.standart}
            availableAmount={nft.in_stock_number}
            price={nft.price}
            USD_price={nft.USD_price}
            isTimedAuction={nft.is_timed_auction}
            isAuction={nft.is_auction}
            end_auction={nft.is_timed_auction && moment.now() / 1000}
            isSelling={nft.is_selling}
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
