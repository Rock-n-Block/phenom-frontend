import { useEffect, useState, VFC } from 'react';
import { useParams } from 'react-router-dom';

import mock from 'mock';
import moment from 'moment';

import { NameAndLike, OwnersAndCreators, Payment, PropsAndDescr } from './components';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  const { id = 1 } = useParams();
  const [nft, setNft] = useState<any>({});

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setNft(mock.nftCard[id]);
  }, [id]);
  return (
    <div className={styles.nftCard}>
      <div className={styles.left}>
        <PropsAndDescr
          media={nft.img}
          properties={nft.properties}
          description={nft.description}
          isTimedAuction={nft.isTimedAuction}
          isAuction={nft.isAuction}
        />
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
    </div>
  );
};

export default NFTCard;
