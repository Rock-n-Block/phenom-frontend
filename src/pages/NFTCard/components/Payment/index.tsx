import { useCallback, useEffect, useState, VFC } from 'react';

import cx from 'classnames';
// import { OwnerList, UserBuy } from './components';
import moment from 'moment';

import { Avatar, Button, DefaultInput, QuantityInput, Switch, Text } from 'components';

import { INft, TNullable } from 'types';

import {
  DollarIcon,
  iconArrowUpGreen,
  iconPencil,
  iconPlaceBid,
  iconTransfer,
  PlaceBidIcon,
} from 'assets/img';

import styles from './styles.module.scss';

type IPayment = {
  nft: TNullable<INft>;
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isUserCanChangePrice: boolean;
};

const hours = [
  { value: '12', label: '12 h' },
  { value: '24', label: '24 h' },
  { value: '48', label: '48 h' },
];

const Payment: VFC<IPayment> = ({
  nft,
  isUserCanEndAuction,
  isUserCanBuyNft,
  isUserCanEnterInAuction,
  isUserCanPutOnSale,
  isOwner,
  isUserCanRemoveFromSale,
  isUserCanChangePrice,
}) => {
  const [quantity, setQuantity] = useState('1');
  const [bid, setBid] = useState('');
  const [time, setTime] = useState<any>();
  const [days, setDays] = useState(0);
  const [isListing, setIsListing] = useState(false);
  const [isFixedPrice, setIsFixedPrice] = useState(false);
  const [price, setPrice] = useState('');
  const [isTimedAuction, setIsTimedAuction] = useState(true);
  const [hoursTime, setHoursTime] = useState(hours[0].value);

  const handleList = useCallback(() => {
    setIsListing(true);
  }, []);

  const handleChangeType = useCallback(() => {
    setIsFixedPrice(!isFixedPrice);
  }, [isFixedPrice]);

  const handleChangeHours = useCallback((value: string) => {
    setHoursTime(value);
  }, []);

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
    <>
      {nft?.price && (
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
          {/* {(nft?.is_auc_selling || nft?.is_timed_auc_selling) && (
          <Text className={styles.quantity}>Bid</Text>
        )} */}
          {(isUserCanBuyNft || isUserCanEnterInAuction) && (
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
          )}
          {(isUserCanEndAuction ||
            isUserCanPutOnSale ||
            isUserCanRemoveFromSale ||
            isUserCanChangePrice) &&
            !isListing && (
              <div className={cx(styles.choose, styles.chooseInside)}>
                {isOwner && (
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.transfer)}
                    suffixIcon={iconTransfer}
                  >
                    Transfer
                  </Button>
                )}

                {isUserCanRemoveFromSale && (
                  <Button color="dark" className={cx(styles.button, styles.remove)}>
                    Remove from sale
                  </Button>
                )}
                {isUserCanChangePrice ? (
                  <Button
                    color="light"
                    className={styles.button}
                    suffixIcon={iconPencil}
                    onClick={handleList}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button color="light" className={styles.button} onClick={handleList}>
                    List for sale
                  </Button>
                )}
              </div>
            )}
        </div>
      )}

      {(isUserCanEndAuction ||
        isUserCanPutOnSale ||
        isUserCanRemoveFromSale ||
        isUserCanChangePrice) && (
        <div className={styles.ownerList}>
          {isListing ? (
            <>
              <div className={styles.sellType}>
                <div
                  className={cx(styles.type, { [styles.typeActive]: isFixedPrice })}
                  onClick={handleChangeType}
                  tabIndex={0}
                  onKeyDown={() => {}}
                  role="button"
                >
                  <div className={styles.iconWrapper}>
                    <DollarIcon className={styles.icon} />
                  </div>
                  <Text
                    size="xl"
                    weight="semibold"
                    className={styles.typeTitle}
                    color={isFixedPrice ? 'white' : 'black'}
                  >
                    Fixed price
                  </Text>
                  <Text align="center" color="middleGray" className={styles.typeText}>
                    Sell at fixed price
                  </Text>
                </div>
                <div
                  className={cx(styles.type, { [styles.typeActive]: !isFixedPrice })}
                  onClick={handleChangeType}
                  tabIndex={0}
                  onKeyDown={() => {}}
                  role="button"
                >
                  <div className={styles.iconWrapper}>
                    <PlaceBidIcon className={styles.icon} />
                  </div>
                  <Text
                    size="xl"
                    weight="semibold"
                    className={styles.typeTitle}
                    color={!isFixedPrice ? 'white' : 'black'}
                    align="center"
                  >
                    Open for bids
                  </Text>
                  <Text align="center" color="middleGray" className={styles.typeText}>
                    Sell through Auction
                  </Text>
                </div>
              </div>
              <div className={styles.createLot}>
                <Text>{isFixedPrice ? 'Price' : 'Minimum bid'}</Text>
                <DefaultInput
                  name="priceOrBid"
                  value={price}
                  setValue={setPrice}
                  type="number"
                  placeholder="0.00"
                  className={styles.createLotPrice}
                />
                <Text color="middleGray" size="m">
                  ${price ? (+price / 2463.3).toFixed(2) : '00.00'}
                </Text>
                {!isFixedPrice && (
                  <>
                    <Switch
                      value={isTimedAuction}
                      setValue={setIsTimedAuction}
                      optionLeft="Timed auction"
                      optionRight="Auction"
                      className={styles.switch}
                    />

                    <div className={styles.hours}>
                      {hours.map(({ label, value }) => (
                        <div
                          className={cx(styles.hour, { [styles.hourActive]: value === hoursTime })}
                          onClick={() => handleChangeHours(value)}
                          onKeyDown={() => {}}
                          tabIndex={0}
                          role="button"
                        >
                          <Text
                            size="m"
                            weight="semibold"
                            className={cx(styles.hourLabel, {
                              [styles.hourLabelActive]: value === hoursTime,
                            })}
                            align="center"
                          >
                            {label}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {nft?.price ? (
                  <Button padding="medium" className={styles.createLotBtn} disabled={!price}>
                    Update
                  </Button>
                ) : (
                  <Button padding="medium" className={styles.createLotBtn} disabled={!price}>
                    Create lot
                  </Button>
                )}
              </div>
            </>
          ) : (
            !nft?.price && (
              <>
                <div className={styles.choose}>
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.transfer)}
                    suffixIcon={iconTransfer}
                  >
                    Transfer
                  </Button>
                  {nft?.is_selling ? (
                    <Button
                      color="light"
                      className={styles.button}
                      suffixIcon={iconPencil}
                      onClick={handleList}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button color="light" className={styles.button} onClick={handleList}>
                      List for sale
                    </Button>
                  )}
                </div>
              </>
            )
          )}
        </div>
      )}

      {/* {isOwner ? (
        <OwnerList
          nft={nft}
          isUserCanEndAuction={isUserCanEndAuction}
          isUserCanPutOnSale={isUserCanPutOnSale}
          isUserCanRemoveFromSale={isUserCanRemoveFromSale}
          isUserCanChangePrice={isUserCanChangePrice}
        />
      ) : (
        <UserBuy
          nft={nft}
          isUserCanBuyNft={isUserCanBuyNft}
          isUserCanEnterInAuction={isUserCanEnterInAuction}
        />
      )} */}
    </>
  );
};

export default Payment;
