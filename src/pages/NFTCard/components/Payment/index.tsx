import { useEffect, useState, VFC } from 'react';

import moment from 'moment';

import { Button, DefaultInput, QuantityInput, Text } from 'components';

import { iconPlaceBid, PlaceBidIcon } from 'assets/img';

import styles from './styles.module.scss';

type IPayment = {
  isAuction?: boolean;
  isTimedAuction?: boolean;
  price?: string | number;
  USD_price?: string | number;
  // standart: 'ERC721' | 'ERC1155';
  standart: string;
  availableAmount?: number;
  start_auction?: number;
  end_auction?: number;
};

const Payment: VFC<IPayment> = ({
  isAuction,
  isTimedAuction,
  price,
  USD_price,
  standart,
  availableAmount,
  end_auction,
}) => {
  const [quantity, setQuantity] = useState('1');
  const [bid, setBid] = useState('');
  const [time, setTime] = useState<any>();
  const [days, setDays] = useState(0);

  useEffect(() => {
    let timeInterval: any;
    if (end_auction) {
      const eventTime = +(end_auction || 0) * 1000;
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
  }, [end_auction]);

  return (
    <div className={styles.payment}>
      {isTimedAuction && (
        <div className={styles.timedAuc}>
          <div className={styles.timedAucTitle}>
            <PlaceBidIcon className={styles.timedAucIcon} />
            <Text size="m" weight="semibold">
              Sale ends at {moment(end_auction, 'X').format('MMMM Do YYYY, h:mm a')}
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
      {isAuction ? (
        <div>
          {isTimedAuction ? (
            <Text size="m" weight="semibold" color="green">
              Minimum bid
            </Text>
          ) : (
            <Text color="yellow" size="m" weight="semibold">
              Current bid
            </Text>
          )}
        </div>
      ) : (
        <Text size="m" weight="semibold" color="middleGray">
          Price
        </Text>
      )}
      {price && (
        <Text weight="semibold" color="blue" className={styles.price}>
          {price} PHETA
        </Text>
      )}
      {USD_price && (
        <Text color="middleGray" size="m" weight="semibold" className={styles.usdPrice}>
          ${USD_price}
        </Text>
      )}

      {standart === 'ERC1155' && <Text className={styles.quantity}>Quantity</Text>}
      {(isAuction || isTimedAuction) && <Text className={styles.quantity}>Bid</Text>}
      <div className={styles.priceBids}>
        {standart === 'ERC1155' && (
          <QuantityInput
            value={+quantity < 10 ? `0${quantity}` : quantity}
            setValue={setQuantity}
            name="quantity"
            writeable={false}
            maxAmount={availableAmount}
            minAmount={1}
            inputClassName={styles.quantityInput}
          />
        )}
        {(isAuction || isTimedAuction) && (
          <DefaultInput
            name="bid"
            value={bid}
            setValue={setBid}
            className={styles.priceInput}
            placeholder="0.00"
          />
        )}
        <Button
          className={styles.buy}
          padding="extra-large"
          suffixIcon={isAuction || isTimedAuction ? iconPlaceBid : ''}
        >
          {isAuction || isTimedAuction ? 'Place a bid' : 'Buy'}
        </Button>
      </div>
    </div>
  );
};

export default Payment;
