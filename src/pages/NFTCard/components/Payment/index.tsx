import { useCallback, useEffect, useState, VFC } from 'react';

import cx from 'classnames';
// import { OwnerList, UserBuy } from './components';
import moment from 'moment';

import { Avatar, Button, DefaultInput, QuantityInput, Selector, Text } from 'components';

import { DEFAULT_CURRENCY } from 'appConstants';
import { TokenFull } from 'types';

import ApproveModal from '../modals/ApproveModal';
import TransferModal from '../modals/TransferModal';

import {
  DollarIcon,
  iconArrowUpGreen,
  iconPencil,
  iconPlaceBid,
  iconTransfer,
  PlaceBidIcon,
} from 'assets/img';

import styles from './styles.module.scss';

enum ModalType {
  init = 'INIT',
  approve = 'APPROVE',
  transfer = 'TRANSFER',
}

interface IPayment {
  nft: TokenFull;
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isUserCanChangePrice: boolean;
  handleBuy: () => void;
  handleSetOnAuction: (
    minimalBid: number | string,
    currency: string,
    auctionDuration: number,
  ) => () => void;
  handleBid: (amount: number | string, currency: string) => void;
}

const hours = [
  { value: 43200, label: '12 h' },
  { value: 86400, label: '24 h' },
  { value: 172800, label: '48 h' },
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
  handleBuy,
  handleSetOnAuction,
  handleBid,
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
  const [modalType, setModalType] = useState(ModalType.init);

  const handleSetModalType = useCallback((newModalType: ModalType) => {
    setModalType(newModalType);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(ModalType.init);
  }, []);

  const handleList = useCallback(() => {
    setIsListing(true);
  }, []);

  const handleChangeType = useCallback(() => {
    setIsFixedPrice(!isFixedPrice);
  }, [isFixedPrice]);

  const handleChangeHours = useCallback((value: number) => {
    setHoursTime(value);
  }, []);

  useEffect(() => {
    let timeInterval: any;
    if (nft?.endAuction) {
      const eventTime = +(nft?.endAuction || 0) * 1000;
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
                  Sale ends at {moment(nft?.endAuction, 'X').format('MMMM Do YYYY, h:mma')}
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
          {nft?.isAucSelling || nft?.is_timed_auc_selling ? (
            <div>
              {nft?.highestBid ? (
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
          {nft?.usdPrice && (
            <Text color="middleGray" size="m" className={styles.usdPrice}>
              ${nft?.usdPrice}
            </Text>
          )}
          {nft?.highestBid && (
            <div className={styles.highest}>
              <Avatar id={nft?.highestBid.id || 0} avatar={nft?.highestBid.bidder_avatar} />
              <Text className={styles.highestName}>
                {nft?.highestBid.bidder}{' '}
                <img alt="arrow" src={iconArrowUpGreen} className={styles.arrow} />{' '}
              </Text>
            </div>
          )}
          {/* {(nft?.is_auc_selling || nft?.is_timed_auc_selling) && (
          <Text className={styles.quantity}>Bid</Text>
        )} */}
          {(isUserCanBuyNft || isUserCanEnterInAuction) && (
            <div className={styles.priceBids}>
              {nft?.standart === 'ERC1155' && (
                <QuantityInput
                  value={quantity}
                  setValue={setQuantity}
                  name="quantity"
                  writeable
                  maxAmount={nft?.available}
                  minAmount={1}
                  inputClassName={styles.quantityInput}
                />
              )}
              {(nft?.isAucSelling || nft?.is_timed_auc_selling) && (
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
                suffixIcon={nft?.isAucSelling || nft?.is_timed_auc_selling ? iconPlaceBid : ''}
                onClick={
                  nft?.isAucSelling || nft?.is_timed_auc_selling
                    ? () => handleBid(bid, nft?.currency.symbol || 'PHETA')
                    : () => handleBuy()
                }
              >
                {nft?.isAucSelling || nft?.is_timed_auc_selling ? 'Place a bid' : 'Buy'}
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
                    onClick={() => handleSetModalType(ModalType.transfer)}
                  >
                    Transfer
                  </Button>
                )}
                {isUserCanEndAuction && (
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.remove)}
                    onClick={() => handleSetModalType(ModalType.approve)}
                  >
                    Accept bid
                  </Button>
                )}
                {isUserCanRemoveFromSale && (
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.remove)}
                    onClick={() => handleSetModalType(ModalType.approve)}
                  >
                    Remove from sale
                  </Button>
                )}
                {isUserCanChangePrice && (
                  <Button
                    color="light"
                    className={styles.button}
                    suffixIcon={iconPencil}
                    onClick={handleList}
                  >
                    Edit
                  </Button>
                )}
                {isUserCanPutOnSale && (
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
                    <Selector
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
                  <Button
                    padding="medium"
                    className={styles.createLotBtn}
                    disabled={!price}
                    onClick={() => handleSetModalType(ModalType.approve)}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    padding="medium"
                    className={styles.createLotBtn}
                    disabled={!price}
                    onClick={() =>
                      handleSetOnAuction(price, nft?.currency.symbol || DEFAULT_CURRENCY, hoursTime)
                    }
                  >
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
                    onClick={() => handleSetModalType(ModalType.transfer)}
                  >
                    Transfer
                  </Button>
                  {nft?.isSelling ? (
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

      <TransferModal
        visible={modalType === ModalType.transfer}
        onClose={() => handleCloseModal()}
      />
      <ApproveModal visible={modalType === ModalType.approve} onClose={() => handleCloseModal()} />
    </>
  );
};

export default Payment;
