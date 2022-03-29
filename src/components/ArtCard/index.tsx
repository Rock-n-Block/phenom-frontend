/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

// import { PinkHeart } from 'assets/img';
import cx from 'classnames';

import { ArtCardAuthor, H4, Text } from 'components';
import LikeButton from 'components/LikeButton';
import Loader from 'components/Loader';
// import { IBidder } from 'typings';
import { sliceString, toFixed } from 'utils';

import { routes } from 'appConstants';

import styles from './styles.module.scss';

type Props = {
  type?: 'Padded' | 'Contained' | 'Covered';
  artId: string | number;
  className?: string;
  imageMain: string;
  // imageSecondaryOne?: string;
  // imageSecondaryTwo?: string;
  // imageSecondaryThree?: string;
  // allArtNumber?: string | number;
  name: string;
  price: string | number;
  USD_price: string | number;
  asset: string;
  isAuction?: boolean;
  inStockNumber?: number | string;
  author: string;
  authorAvatar: string;
  authorId: number;
  likesNumber?: number;
  isCollection?: boolean;
  bids?: any[];
  isLiked?: boolean;
};

const ArtCard: FC<Props> = ({
  type = 'Covered',
  artId,
  className,
  imageMain,
  // imageSecondaryOne,
  // imageSecondaryTwo,
  // imageSecondaryThree,
  // allArtNumber = '25',
  name,
  price,
  USD_price,
  asset,
  isAuction,
  inStockNumber,
  author,
  authorId,
  authorAvatar,
  likesNumber = 0,
  isCollection,
  bids,
  isLiked = false,
}) => {
  const wrapRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const offset = 2.5;
  const onMouseOver = useCallback(() => {
    if (wrapRef.current && imgRef.current) {
      const div = wrapRef.current;
      const img = imgRef.current;
      const mouseMoveEvent = (e: any) => {
        const moveX = 100 - ((e.offsetX - offset) / div.offsetWidth) * 100;
        const moveY = 100 - ((e.offsetY - offset) / div.offsetHeight) * 100;
        img.style.objectPosition = `${moveX}% ${moveY}%`;
      };
      div.addEventListener('mousemove', mouseMoveEvent);
      div.onmouseleave = function () {
        div.removeEventListener('mousemove', mouseMoveEvent);
        img.style.objectPosition = '50% 50%';
        div.onmouseleave = null;
      };
    }
  }, [imgRef, wrapRef]);

  return (
    <div className={cx(styles.artCard, className)}>
      {isAuction && (
        <div className={styles.auction}>
          <Text color="white">Auction</Text>
        </div>
      )}
      <Link
        to={isCollection ? routes.collection.link(artId) : routes.nft.link(artId)}
        className={styles.imageWrapper}
        onMouseOver={onMouseOver}
        onFocus={() => {}}
        ref={wrapRef}
      >
        {imageMain ? (
          <img ref={imgRef} className={cx(styles.mainImage, styles[type])} src={imageMain} alt="" />
        ) : (
          <Loader className={styles.loader} />
        )}
      </Link>
      <div className={styles.artCardInfo}>
        <H4>{sliceString(name, 20, 0)}</H4>
        <Text weight="bold" color="lightGray">
          Id: {artId}
        </Text>
        <div className={cx(styles.flexContainer, styles.column)}>
          {price ? (
            <>
              {!isAuction && (
                <Text weight="bold" color="lightGray" className={styles.price}>
                  Price
                </Text>
              )}
              {isAuction &&
                (bids?.length ? (
                  <Text weight="bold" color="yellow" className={styles.current}>
                    Current bid
                  </Text>
                ) : (
                  <Text weight="bold" color="green" className={styles.minimal}>
                    Minimal bid
                  </Text>
                ))}
              <Text
                id="none"
                className={styles.artCardPrice}
                size="xl"
                color="blue"
                weight="semibold"
              >
                {`${toFixed(price, 3)} ${asset}`}{' '}
              </Text>
            </>
          ) : (
            <div className={styles.empty}> </div>
          )}
          <div className={cx(styles.bottom, { [styles.bottomRight]: !price })}>
            {USD_price ? (
              <Text id="none" weight="bold" color="lightGray">
                $ {USD_price}
              </Text>
            ) : (
              <></>
            )}
            {!bids?.length ? (
              <Text color="middleGray" weight="semibold" size="m">
                {inStockNumber ? `in stock: ${inStockNumber}` : 'Out of stock'}
              </Text>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={cx(styles.flexContainer, styles.artCardAuthorContainer)}>
          <div className={styles.flexContainer}>
            {authorId && <ArtCardAuthor id={authorId} avatar={authorAvatar} name={author} />}
          </div>
          <LikeButton isLiked={isLiked} likesNumber={likesNumber} artId={artId} />
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
