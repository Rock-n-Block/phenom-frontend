import { useCallback, useEffect, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { bid, buy, endAuction, removeFromSale, setOnAuction, setOnSale } from 'store/nfts/actions';

import cx from 'classnames';
import { useWalletConnectContext } from 'context';
import moment from 'moment';

import { Avatar, Button, DefaultInput, QuantityInput, Selector, Text } from 'components';

import { DEFAULT_CURRENCY } from 'appConstants';
import { Modals, TokenFull } from 'types';

import ApprovePendingModal from '../modals/ApprovePendingModal';
import ApproveRejectedModal from '../modals/ApproveRejectedModal';
import BurnModal from '../modals/BurnModal';
import SellersModal from '../modals/SellersModal';
import SendPendingModal from '../modals/SendPendingModal';
import SendRejectedModal from '../modals/SendRejectedModal';
import SendSuccessModal from '../modals/SendSuccessModal';
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

interface IPayment {
  nft: TokenFull;
  isUserCanEndAuction: boolean;
  isUserCanBuyNft: boolean;
  isUserCanEnterInAuction: boolean;
  isUserCanPutOnSale: boolean;
  isOwner: boolean;
  isUserCanRemoveFromSale: boolean;
  isUserCanChangePrice: boolean;
}

const hours = [
  { value: 43200, label: '12 h', key: 12 },
  { value: 86400, label: '24 h', key: 24 },
  { value: 172800, label: '48 h', key: 48 },
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
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectContext();
  const [quantity, setQuantity] = useState('1');
  const [bidValue, setBidValue] = useState('');
  const [time, setTime] = useState<any>();
  const [days, setDays] = useState(0);
  const [isListing, setIsListing] = useState(false);
  const [isFixedPrice, setIsFixedPrice] = useState(false);
  const [priceValue, setPriceValue] = useState('');
  const [isTimedAuction, setIsTimedAuction] = useState(true);
  const [hoursTime, setHoursTime] = useState(hours[0]);
  const [modalType, setModalType] = useState(Modals.none);

  const handleSetModalType = useCallback((newModalType: Modals) => {
    setModalType(newModalType);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(Modals.none);
  }, []);

  const handleList = useCallback(() => {
    setIsListing(true);
  }, []);

  const handleChangeType = useCallback(() => {
    setIsFixedPrice(!isFixedPrice);
  }, [isFixedPrice]);

  const handleChangeHours = useCallback((value) => {
    setHoursTime(value);
  }, []);

  const handleBuy = useCallback(
    (sellerId: string | number) => {
      if (nft) {
        dispatch(
          buy({
            id: nft?.id || 0,
            amount: nft?.price || 0,
            sellerId,
            web3Provider: walletService.Web3(),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handlePreBuy = useCallback(
    (isSingle: boolean) => {
      if (isSingle) {
        handleBuy(nft?.sellers?.[0].url || 0);
      }
      if (!isSingle) {
        handleSetModalType(Modals.ChooseSeller);
      }
    },
    [handleBuy, handleSetModalType, nft.sellers],
  );

  const handleEndAuction = useCallback(() => {
    if (nft) {
      dispatch(
        endAuction({
          id: nft?.id || 0,
          web3Provider: walletService.Web3(),
        }),
      );
    }
  }, [nft, dispatch, walletService]);

  const handleSetOnAuction = useCallback(
    (minimalBid: number | string, currency: string, auctionDuration?: number) => () => {
      if (nft) {
        dispatch(
          setOnAuction({
            id: nft?.id || 0,
            internalId: nft.internalId || 0,
            minimalBid,
            currency,
            isSingle: nft?.standart === 'ERC721',
            auctionDuration,
            web3Provider: walletService.Web3(),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handleSetOnSale = useCallback(
    (price: number | string, currency: string, amount?: number | string) => () => {
      if (nft) {
        dispatch(
          setOnSale({
            id: nft?.id || 0,
            internalId: nft.internalId || 0,
            price,
            currency,
            isSingle: nft?.standart === 'ERC721',
            amount,
            web3Provider: walletService.Web3(),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handleBid = useCallback(
    (amount: number | string, currency: string) => {
      dispatch(
        bid({
          id: nft?.id || 0,
          amount,
          currency,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [nft, dispatch, walletService],
  );

  const handleRemoveFromSale = useCallback(() => {
    dispatch(
      removeFromSale({
        id: nft?.id,
        web3Provider: walletService.Web3(),
      }),
    );
  }, [nft, dispatch, walletService]);

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
      {(nft?.price || nft?.minimalBid) && (
        <div className={styles.userBuy}>
          {nft?.isTimedAucSelling && (
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
          {nft?.isAucSelling || nft?.isTimedAucSelling ? (
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
              {nft?.price} PHENOM
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
          {/* {(nft?.is_auc_selling || nft?.isTimedAucSelling) && (
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
              {(nft?.isAucSelling || nft?.isTimedAucSelling) && (
                <DefaultInput
                  name="bid"
                  value={bidValue}
                  setValue={setBidValue}
                  className={styles.priceInput}
                  placeholder="0.00"
                  type="number"
                />
              )}
              <Button
                className={styles.buy}
                padding="extra-large"
                suffixIcon={nft?.isAucSelling || nft?.isTimedAucSelling ? iconPlaceBid : ''}
                onClick={
                  nft?.isAucSelling || nft?.isTimedAucSelling
                    ? () => handleBid(bidValue, nft?.currency?.symbol || DEFAULT_CURRENCY)
                    : () => handlePreBuy(nft?.standart === 'ERC721')
                }
              >
                {nft?.isAucSelling || nft?.isTimedAucSelling ? 'Place a bid' : 'Buy'}
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
                    onClick={() => handleSetModalType(Modals.Transfer)}
                  >
                    Transfer
                  </Button>
                )}
                {isUserCanEndAuction && (
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.remove)}
                    onClick={() => handleEndAuction()}
                  >
                    Accept bid
                  </Button>
                )}
                {isUserCanRemoveFromSale && (
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.remove)}
                    onClick={() => handleRemoveFromSale()}
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
                  value={priceValue}
                  setValue={setPriceValue}
                  type="number"
                  placeholder="0.00"
                  className={styles.createLotPrice}
                />
                {nft?.usdPrice && (
                  <Text color="middleGray" size="m">
                    ${nft?.usdPrice}
                  </Text>
                )}
                {!isFixedPrice && (
                  <>
                    <Selector
                      value={isTimedAuction}
                      setValue={setIsTimedAuction}
                      optionLeft="Timed auction"
                      optionRight="Auction"
                      className={styles.switch}
                    />

                    {isTimedAuction ? (
                      <div className={styles.hours}>
                        {hours.map((hour) => (
                          <div
                            className={cx(styles.hour, {
                              [styles.hourActive]: hour.key === hoursTime.key,
                            })}
                            onClick={() => handleChangeHours(hour)}
                            onKeyDown={() => {}}
                            tabIndex={0}
                            role="button"
                          >
                            <Text
                              size="m"
                              weight="semibold"
                              className={cx(styles.hourLabel, {
                                [styles.hourLabelActive]: hour.key === hoursTime.key,
                              })}
                              color={hour.key === hoursTime.key ? 'white' : 'dark'}
                              align="center"
                            >
                              {hour.label}
                            </Text>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {nft?.price ? (
                  <div>
                    {
                      // TODO: проверить не конфликтует quantity для покупки с quantity для выставления на продажу
                      nft?.standart === 'ERC1155' && (
                        <QuantityInput
                          value={quantity}
                          setValue={setQuantity}
                          name="quantity"
                          writeable
                          maxAmount={nft?.available}
                          minAmount={1}
                          inputClassName={styles.quantityInput}
                        />
                      )
                    }
                    <Button
                      padding="medium"
                      className={styles.createLotBtn}
                      disabled={!priceValue}
                      onClick={
                        isFixedPrice
                          ? handleSetOnSale(
                              priceValue,
                              nft?.currency?.symbol || DEFAULT_CURRENCY,
                              +quantity,
                            )
                          : handleSetOnAuction(
                              priceValue,
                              nft?.currency?.symbol || DEFAULT_CURRENCY,
                              hoursTime.value,
                            )
                      }
                    >
                      Update
                    </Button>
                  </div>
                ) : (
                  <Button
                    padding="medium"
                    className={styles.createLotBtn}
                    disabled={!priceValue}
                    onClick={
                      isFixedPrice
                        ? handleSetOnSale(
                            priceValue,
                            nft?.currency?.symbol || DEFAULT_CURRENCY,
                            +quantity,
                          )
                        : handleSetOnAuction(
                            priceValue,
                            nft?.currency?.symbol || DEFAULT_CURRENCY,
                            hoursTime.value,
                          )
                    }
                  >
                    Create lot
                  </Button>
                )}
              </div>
            </>
          ) : (
            !nft?.price &&
            !nft?.minimalBid && (
              <>
                <div className={styles.choose}>
                  <Button
                    color="dark"
                    className={cx(styles.button, styles.transfer)}
                    suffixIcon={iconTransfer}
                    onClick={() => handleSetModalType(Modals.Transfer)}
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

      <TransferModal visible={modalType === Modals.Transfer} onClose={() => handleCloseModal()} />

      <BurnModal visible={modalType === Modals.Burn} onClose={() => handleCloseModal()} />

      <SellersModal
        visible={modalType === Modals.ChooseSeller}
        onClose={() => handleCloseModal()}
        sellers={nft?.sellers}
        handleChooseSeller={handleBuy}
      />

      <ApprovePendingModal
        visible={modalType === Modals.ApprovePending}
        onClose={() => handleCloseModal()}
      />
      <ApproveRejectedModal
        visible={modalType === Modals.ApproveRejected}
        onClose={() => handleCloseModal()}
      />
      <SendPendingModal
        visible={modalType === Modals.SendPending}
        onClose={() => handleCloseModal()}
      />
      <SendSuccessModal
        visible={modalType === Modals.SendSuccess}
        onClose={() => handleCloseModal()}
      />
      <SendRejectedModal
        visible={modalType === Modals.SendRejected}
        onClose={() => handleCloseModal()}
      />
    </>
  );
};

export default Payment;
