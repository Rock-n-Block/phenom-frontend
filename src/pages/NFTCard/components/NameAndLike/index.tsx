import { useCallback, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { like } from 'store/nfts/actions';

import cx from 'classnames';

import { Button, EllipsisText, Text } from 'components';
import { numberFormatter } from 'utils';

import { HeartFilledIcon, HeartIcon } from 'assets/img';

import styles from './styles.module.scss';

type INameAndLike = {
  name: string;
  artId: number;
  likeCount: number;
  isLiked?: boolean;
  inStockNumber?: number;
};

const NameAndLike: VFC<INameAndLike> = ({
  name,
  artId,
  likeCount,
  isLiked = false,
  inStockNumber,
}) => {
  const [isLike, setIsLike] = useState(isLiked);
  const [likesNumber, setLikesNumber] = useState(likeCount);
  const dispatch = useDispatch();

  const handleLike = useCallback(() => {
    if (isLike) {
      setLikesNumber(likesNumber - 1);
    }
    if (!isLike) {
      setLikesNumber(likesNumber + 1);
    }
    setIsLike(!isLike);
    dispatch(
      like({
        id: artId,
      }),
    );
  }, [artId, dispatch, isLike, likesNumber]);

  return (
    <div className={styles.nameAndLike}>
      <div className={styles.top}>
        <EllipsisText>
          <Text size="xxxxl" weight="semibold">
            {name}
          </Text>
        </EllipsisText>
        <Button
          className={cx(styles.button, styles.likeButton)}
          onClick={handleLike}
          color="outline"
        >
          {isLike ? <HeartFilledIcon /> : <HeartIcon />}
          <Text size="s" color="inherit">
            {numberFormatter(likesNumber || 0, 1000)}
          </Text>
        </Button>
      </div>
      <div className={styles.bottom}>
        <Text color="middleGray" weight="semibold" size="m" className={styles.bottomItem}>
          Id: {artId}
        </Text>
        {inStockNumber && (
          <Text color="middleGray" weight="semibold" size="m">
            In stock: {inStockNumber}
          </Text>
        )}
      </div>
    </div>
  );
};

export default NameAndLike;
