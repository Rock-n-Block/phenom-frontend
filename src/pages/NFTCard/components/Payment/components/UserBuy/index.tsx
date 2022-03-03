import { useEffect, useState, VFC } from 'react';

import moment from 'moment';

import { Avatar, Button, DefaultInput, QuantityInput, Text } from 'components';

import { INft, TNullable } from 'types';

import { iconArrowUpGreen, iconPlaceBid, PlaceBidIcon } from 'assets/img';

import styles from './styles.module.scss';

type IUserBuy = {
  nft: TNullable<INft>;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
};

const UserBuy: VFC<IUserBuy> = ({ nft }) => {
  const [quantity, setQuantity] = useState('1');
  const [bid, setBid] = useState('');
  const [time, setTime] = useState<any>();
  const [days, setDays] = useState(0);

  useEffect(() => {
    let timeInterval: any;
    if (nft?.end_auction) {
      const eventTime = +(nft?.end_auction || 0) * 1000;
      const date = new Date();
      const currentTime = date.getTime() - date.getTimezoneOffset() * 60000;
      const diffTime = eventTime - currentTime;
      let duration = moment.duration(diffTime, 'milliseconds');
      const interval = 1000;
      timeInterval = setInterval(() => {
        duration = moment.duration(+duration - interval, 'milliseconds');
        setDays(Math.trunc(duration.asDays()));
        setTime(moment(duration.asMilliseconds()));
      }, interval);
    }

    return () => clearInterval(timeInterval);
  }, [nft]);

  return (
    <div className={styles.userBuy}>
      {nft?.is_timed_auc_selling && (
        <div className={styles.timedAuc}>
          <div className={styles.timedAucTitle}>
            <PlaceBidIcon className={styles.timedAucIcon} />
            <Text size="m" weight="semibold">
              Sale ends at {moment(nft?.end_auction, 'X').format('MMMM Do YYYY, h:mma')}
            </Text>
          </div>
          <div className={styles.time}>
            <div className={styles.timeItem}>
              <Text size="xxl" color="blue" weight="semibold">
                {days ? 24 * days + moment(time).format('HH') : moment(time).format('HH')}
              </Text>
              <Text>Hours</Text>
            </div>
            <div className={styles.timeItem}>
              <Text size="xxl" color="blue" weight="semibold">
                {moment(time).format('mm')}
              </Text>
              <Text>Minutes</Text>
            </div>
            <div className={styles.timeItem}>
              <Text size="xxl" color="blue" weight="semibold">
                {moment(time).format('ss')}
              </Text>
              <Text>Seconds</Text>
            </div>
          </div>
        </div>
      )}
      {nft?.is_auc_selling || nft?.is_timed_auc_selling ? (
        <div>
          {nft?.highest_bid ? (
            <Text color="yellow" size="m" weight="semibold">
              Current bid
            </Text>
          ) : (
            <Text size="m" weight="semibold" color="green">
              Minimum bid
            </Text>
          )}
        </div>
      ) : (
        <Text size="m" weight="semibold" color="middleGray">
          Price
        </Text>
      )}
      {nft?.price && (
        <Text weight="semibold" color="blue" className={styles.price}>
          {nft?.price} PHETA
        </Text>
      )}
      {nft?.USD_price && (
        <Text color="middleGray" size="m" className={styles.usdPrice}>
          ${nft?.USD_price}
        </Text>
      )}
      {nft?.highest_bid && (
        <div className={styles.highest}>
          <Avatar id={nft?.highest_bid.id} avatar={nft?.highest_bid.bidder_avatar} />
          <Text>
            {nft?.highest_bid.bidder}{' '}
            <img alt="arrow" src={iconArrowUpGreen} className={styles.arrow} />{' '}
          </Text>
        </div>
      )}
      {nft?.standart === 'ERC1155' && <Text className={styles.quantity}>Quantity</Text>}
      {(nft?.is_auc_selling || nft?.is_timed_auc_selling) && (
        <Text className={styles.quantity}>Bid</Text>
      )}
      <div className={styles.priceBids}>
        {nft?.standart === 'ERC1155' && (
          <QuantityInput
            value={+quantity < 10 ? `0${quantity}` : quantity}
            setValue={setQuantity}
            name="quantity"
            writeable={false}
            maxAmount={nft?.available}
            minAmount={1}
            inputClassName={styles.quantityInput}
          />
        )}
        {(nft?.is_auc_selling || nft?.is_timed_auc_selling) && (
          <DefaultInput
            name="bid"
            value={bid}
            setValue={setBid}
            className={styles.priceInput}
            placeholder="0.00"
            type="number"
          />
        )}
        <Button
          className={styles.buy}
          padding="extra-large"
          suffixIcon={nft?.is_auc_selling || nft?.is_timed_auc_selling ? iconPlaceBid : ''}
        >
          {nft?.is_auc_selling || nft?.is_timed_auc_selling ? 'Place a bid' : 'Buy'}
        </Button>
      </div>
    </div>
  );
};

export default UserBuy;
