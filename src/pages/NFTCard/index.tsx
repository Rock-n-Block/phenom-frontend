import { VFC } from 'react';

import mock from 'mock';

import moment from 'moment';

import { NameAndLike, Payment, PropsAndDescr } from './components';

import styles from './styles.module.scss';

const NFTCard: VFC = () => {
  return (
    <div className={styles.nftCard}>
      <div className={styles.left}>
        <PropsAndDescr
          media={mock.nftCard.img}
          properties={mock.nftCard.properties}
          description={mock.nftCard.description}
        />
      </div>
      <div className={styles.right}>
        <NameAndLike
          name={mock.nftCard.name}
          likeCount={mock.nftCard.likeCount}
          artId={mock.nftCard.id}
          inStockNumber={mock.nftCard.inStockNumber}
        />
        <Payment
          standart='ERC721'
          availableAmount={mock.nftCard.inStockNumber}
          price={mock.nftCard.price}
          USD_price={mock.nftCard.USD_price}
          isTimedAuction
          end_auction={moment.now()/1000}

        />
      </div>
    </div>
  );
};

export default NFTCard;
