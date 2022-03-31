import { useCallback, useMemo, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';
import {
  bid,
  buy,
  endAuction,
  removeFromSale,
  setOnAuction,
  setOnSale,
  transfer,
} from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import cx from 'classnames';
import { useWalletConnectContext } from 'context';

import {
  Avatar,
  Button,
  Countdown,
  DefaultInput,
  QuantityInput,
  QuantityModal,
  Selector,
  SellersModal,
  Text,
  TransferModal,
} from 'components';
import { sliceString, toFixed } from 'utils';

import { DEFAULT_CURRENCY } from 'appConstants';
import { useModals, useShallowSelector } from 'hooks';
import { Modals, Ownership, Standart, TokenFull } from 'types';

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
  userId: number | null;
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
  userId,
}) => {
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectContext();
  const rate = useShallowSelector(userSelector.getProp('rate'));
  const [quantity, setQuantity] = useState('1');
  const [bidValue, setBidValue] = useState('');
  const [modalSellerId, setModalSellerId] = useState('0');
  const [isListing, setIsListing] = useState(false);
  const [isFixedPrice, setIsFixedPrice] = useState(true);
  const [priceValue, setPriceValue] = useState('');
  const [isTimedAuction, setIsTimedAuction] = useState(true);
  const [hoursTime, setHoursTime] = useState(hours[0]);
  const { modalType, closeModals, changeModalType } = useModals();

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
    (tokenAmount: string | number) => {
      dispatch(
        buy({
          id: nft?.id || 0,
          amount:
            nft?.sellers?.filter((seller: any) => seller.url === modalSellerId)[0]?.price || 0,
          tokenAmount,
          sellerId: modalSellerId,
          web3Provider: walletService.Web3(),
        }),
      );
    },
    [dispatch, modalSellerId, nft.id, nft.sellers, walletService],
  );

  const handleSetChooseQuantityModal = useCallback(() => {
    changeModalType(Modals.ChooseQuantity);
  }, [changeModalType]);

  const handleChooseSeller = useCallback(
    (id: string) => {
      setModalSellerId(id);

      handleSetChooseQuantityModal();
    },
    [handleSetChooseQuantityModal],
  );

  const handleBuy = useCallback(
    (amount?: string | number, sellerId?: string | number, tokenAmount?: string | number) => {
      if (nft) {
        dispatch(
          buy({
            id: nft?.id || 0,
            amount: amount || 0,
            tokenAmount,
            sellerId,
            web3Provider: walletService.Web3(),
          }),
        );
        dispatch(
          setModalProps({
            onApprove: () => handleBuy(sellerId, amount, tokenAmount),
            onSendAgain: () => handleBuy(sellerId, amount, tokenAmount),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handlePreBuy = useCallback(
    (isSingle: boolean) => {
      if (isSingle) {
        handleBuy(nft?.price);
      }
      if (!isSingle) {
        changeModalType(Modals.ChooseSeller);
      }
    },
    [handleBuy, nft.price, changeModalType],
  );

  const handleEndAuction = useCallback(() => {
    if (nft) {
      dispatch(
        endAuction({
          id: nft?.id || 0,
          web3Provider: walletService.Web3(),
        }),
      );
      dispatch(
        setModalProps({
          onApprove: () => handleEndAuction(),
          onSendAgain: () => handleEndAuction(),
        }),
      );
    }
  }, [nft, dispatch, walletService]);

  const handleSetOnAuction = useCallback(
    (minimalBid: number | string, currency: string, auctionDuration?: number) => () => {
      if (nft) {
        dispatch(
          setModalProps({
            onApprove: () => handleSetOnAuction(minimalBid, currency, auctionDuration),
            onSendAgain: () => handleSetOnAuction(minimalBid, currency, auctionDuration),
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
            onApprove: () => handleSetOnSale(price, currency, amount),
          }),
        );
      }
    },
    [nft, dispatch, walletService],
  );

  const handleBid = useCallback(
    (amount: number | string, currency: string) => {
      dispatch(
        setModalProps({
          onApprove: () => handleBid(amount, currency),
          onSendAgain: () => handleBid(amount, currency),
        }),
      );
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

  const nftPrice = useMemo(() => {
    return nft?.price || nft?.highestBid?.amount || nft?.minimalBid
      ? toFixed(nft?.price || nft?.highestBid?.amount || nft?.minimalBid, 6)
      : 0;
  }, [nft]);
  const isAuction = useMemo(
    () => nft?.isAucSelling || nft?.isTimedAucSelling,
    [nft.isAucSelling, nft.isTimedAucSelling],
  );
  return (
    <>
      {nftPrice ? (
        <div className={styles.userBuy}>
          {nft?.isTimedAucSelling && <Countdown endAuction={nft?.endAuction || 0} />}
          {isAuction ? (
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
          {nftPrice && (
            <Text weight="semibold" color="blue" className={styles.price}>
              {nftPrice} {nft?.currency?.symbol || DEFAULT_CURRENCY}
            </Text>
          )}
          {(nft?.usdPrice || nft?.highestBidUsd || nft?.minimalBidUsd) && (
            <Text color="middleGray" size="m" className={styles.usdPrice}>
              ${nft?.usdPrice || nft?.highestBidUsd || nft?.minimalBidUsd}
            </Text>
          )}
          {nft?.highestBid && (
            <div className={styles.highest}>
              <Avatar
                id={nft?.highestBid.user?.url || 0}
                avatar={nft?.highestBid.user?.avatar || ''}
              />
              <Text className={styles.highestName}>
                {sliceString(nft?.highestBid.user?.displayName || nft?.highestBid.user?.name || '')}{' '}
                <img alt="arrow" src={iconArrowUpGreen} className={styles.arrow} />{' '}
              </Text>
            </div>
          )}
          {/* {(nft?.is_auc_selling || nft?.isTimedAucSelling) && (
          <Text className={styles.quantity}>Bid</Text>
        )} */}
          {(isUserCanBuyNft || isUserCanEnterInAuction) && (
            <div className={styles.priceBids}>
              {isAuction && (
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
                suffixIcon={isAuction ? iconPlaceBid : ''}
                disabled={
                  isAuction
                    ? new BigNumber(nft?.highestBid?.amount || nft?.minimalBid).isGreaterThan(
                        new BigNumber(bidValue),
                      )
                    : false
                }
                onClick={
                  isAuction
                    ? () => handleBid(bidValue, nft?.currency?.symbol || DEFAULT_CURRENCY)
                    : () => handlePreBuy(nft?.standart === 'ERC721')
                }
              >
                {isAuction ? 'Place a bid' : 'Buy'}
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
                    onClick={handleEndAuction}
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
      ) : (
        <></>
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
                {priceValue && (
                  <Text color="middleGray" size="m" className={styles.usdPrice}>
                    ${new BigNumber(priceValue).times(new BigNumber(rate)).toFixed(2)}
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
                          maxAmount={
                            +(
                              nft?.owners?.filter(
                                (owner: Ownership) => String(owner.url) === String(userId),
                              )[0]?.quantity || 1
                            )
                          }
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
                          maxAmount={
                            +(
                              nft?.owners?.filter(
                                (owner: Ownership) => String(owner.url) === String(userId),
                              )[0]?.quantity || 1
                            )
                          }
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
        max={
          +(
            nft?.owners?.filter((owner: Ownership) => String(owner.url) === String(userId))[0]
              ?.quantity || nft?.totalSupply
          )
        }
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
        max={
          nft?.sellers?.filter((seller: any) => seller.url === modalSellerId)[0]?.sellingQuantity ||
          1
        }
      />
    </>
  );
};

export default Payment;
