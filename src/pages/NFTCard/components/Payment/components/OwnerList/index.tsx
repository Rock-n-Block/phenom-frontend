import { useCallback, useState, VFC } from 'react';

import cx from 'classnames';

import { Button, DefaultInput, Selector, Text } from 'components';

import { INft, TNullable } from 'types';

import { DollarIcon, iconPencil, iconTransfer, PlaceBidIcon } from 'assets/img';

import styles from './styles.module.scss';

type IOwnerList = {
  nft: TNullable<INft>;
  isUserCanEndAuction: boolean;
  isUserCanPutOnSale: boolean;
  isUserCanRemoveFromSale: boolean;
  isUserCanChangePrice: boolean;
};

const hours = [
  { value: '12', label: '12 h' },
  { value: '24', label: '24 h' },
  { value: '48', label: '48 h' },
];

const OwnerList: VFC<IOwnerList> = ({ nft }) => {
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

  return (
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
              <Text size="xl" weight="semibold" color={isFixedPrice ? 'white' : 'black'}>
                Fixed price
              </Text>
              <Text color="middleGray">Sell at fixed price</Text>
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
              <Text size="xl" weight="semibold" color={!isFixedPrice ? 'white' : 'black'}>
                Open for bids
              </Text>
              <Text color="middleGray">Sell through Auction</Text>
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
            <Button padding="medium" className={styles.createLotBtn} disabled={!price}>
              Create lot
            </Button>
          </div>
        </>
      ) : (
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
      )}
    </div>
  );
};

export default OwnerList;
