import { useCallback, useEffect, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';
// import modalSelector from 'store/modals/selectors';
import {
  bid,
  buy,
  endAuction,
  removeFromSale,
  setOnAuction,
  setOnSale,
  transfer,
} from 'store/nfts/actions';

import cx from 'classnames';
import { useWalletConnectContext } from 'context';
import moment from 'moment';

import {
  // ApprovePendingModal,
  // ApproveRejectedModal,
  Avatar,
  Button,
  DefaultInput,
  QuantityInput,
  QuantityModal,
  Selector,
  SellersModal,
  // SendPendingModal,
  // SendRejectedModal,
  // SendSuccessModal,
  Text,
  TransferModal,
} from 'components';
// import ApproveErrorModal from 'components/Modals/modals/ApproveErrorModal';

import { DEFAULT_CURRENCY } from 'appConstants';
import { useModals } from 'hooks';
import { Modals, Standart, TokenFull } from 'types';

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
  const [modalSellerId, setModalSellerId] = useState('0');
  const [days, setDays] = useState(0);
  const [isListing, setIsListing] = useState(false);
  const [isFixedPrice, setIsFixedPrice] = useState(true);
  const [priceValue, setPriceValue] = useState('');
  const [isTimedAuction, setIsTimedAuction] = useState(true);
  const [hoursTime, setHoursTime] = useState(hours[0]);
  const { modalType, closeModals, changeModalType } = useModals();

  // const modalProps = useShallowSelector(modalSelector.getProp('modalProps'));

  const handleList = useCallback(() => {
    setIsListing(true);
  }, []);

  const handleChangeType = useCallback(() => {
    setIsFixedPrice(!isFixedPrice);
  }, [isFixedPrice]);

  const handleChangeHours = useCallback((value) => {
    setHoursTime(value);
  }, []);

  const handleSetSeller = useCallback(
    (amount: string | number) => {
      dispatch(
        buy({
          id: nft?.id || 0,
          amount: amount || 0,
          sellerId: modalSellerId,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [dispatch, modalSellerId, nft.id, walletService],
  );

  const handleChooseSeller = useCallback(
    (id: string) => {
      setModalSellerId(id);
      // if (nft?.sellers) {
      //   dispatch(
      //     setModalProps({
      //       maxAmount:
      //         nft?.sellers?.filter((seller: any) => seller?.id === id)[0]?.sellingQuantity || 1,
      //     }),
      //   );
      // }
      changeModalType(Modals.ChooseQuantity);
    },
    [changeModalType],
  );

  const handleBuy = useCallback(
    (sellerId: string | number, amount?: string | number) => {
      if (nft) {
        dispatch(
          buy({
            id: nft?.id || 0,
            amount: amount || 0,
            sellerId,
            web3Provider: walletService.Web3(),
          }),
        );
        dispatch(
          setModalProps({
            onApprove: () => handleBuy(sellerId, amount),
            onSendAgain: () => handleBuy(sellerId, amount),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handlePreBuy = useCallback(
    (isSingle: boolean) => {
      if (isSingle) {
        handleBuy(nft?.owners?.[0].url || 0);
      }
      if (!isSingle) {
        changeModalType(Modals.ChooseSeller);
      }
    },
    [handleBuy, changeModalType, nft.owners],
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
          setModalProps({
            onApprove: handleSetOnAuction(minimalBid, currency, auctionDuration),
          }),
        );
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
        dispatch(
          setModalProps({
            onApprove: handleSetOnSale(price, currency, amount),
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
      dispatch(
        setModalProps({
          onApprove: handleBid(amount, currency),
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

  const handleTransfer = useCallback(
    (address: string, amount?: string | number) => {
      dispatch(
        transfer({
          id: nft?.id || 0,
          address,
          amount,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [dispatch, nft.id, walletService],
  );

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
              {nft?.price} {nft?.currency?.symbol || DEFAULT_CURRENCY}
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
                    onClick={() => changeModalType(Modals.Transfer)}
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
              {nft?.standart === 'ERC721' ? (
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
              ) : (
                <></>
              )}
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
                          maxAmount={nft?.totalSupply}
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
                  <div>
                    {
                      // TODO: проверить не конфликтует quantity для покупки с quantity для выставления на продажу
                      nft?.standart === 'ERC1155' && (
                        <QuantityInput
                          value={quantity}
                          setValue={setQuantity}
                          name="quantity"
                          writeable
                          maxAmount={nft?.totalSupply}
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
                              isTimedAuction ? hoursTime.value : undefined,
                            )
                      }
                    >
                      Create lot
                    </Button>
                  </div>
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
                    onClick={() => changeModalType(Modals.Transfer)}
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
        visible={modalType === Modals.Transfer}
        onClose={() => closeModals()}
        isMultiple={nft?.standart === Standart.ERC1155}
        onSend={handleTransfer}
      />

      <SellersModal
        visible={modalType === Modals.ChooseSeller}
        onClose={() => closeModals()}
        sellers={nft?.sellers}
        handleChooseSeller={handleChooseSeller}
      />

      <QuantityModal
        visible={modalType === Modals.ChooseQuantity}
        onClose={() => closeModals()}
        tokenName={nft?.name || ''}
        onSend={handleSetSeller}
      />
      {/* 
      <ApprovePendingModal
        visible={modalType === Modals.ApprovePending}
        onClose={() => closeModals()}
      />

      <ApproveErrorModal
        visible={modalType === Modals.ApproveError}
        onClose={() => closeModals()}
      />

      <ApproveRejectedModal
        visible={modalType === Modals.ApproveRejected}
        onClose={() => closeModals()}
        onApproveAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      />
      <SendPendingModal visible={modalType === Modals.SendPending} onClose={() => closeModals()} />
      <SendSuccessModal visible={modalType === Modals.SendSuccess} onClose={() => closeModals()} />
      <SendRejectedModal
        visible={modalType === Modals.SendRejected}
        onClose={() => closeModals()}
        onSendAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      /> */}
    </>
  );
};

export default Payment;
