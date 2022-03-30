import { useCallback, useState, VFC } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { like } from 'store/nfts/actions';

import cx from 'classnames';

import { Button, Text } from 'components';
import { numberFormatter } from 'utils';

import { HeartIcon } from 'assets/img';

import styles from './styles.module.scss';

interface ILikeButton {
  isLiked: boolean;
  likesNumber: number;
  artId: number | string;
}

const LikeButton: VFC<ILikeButton> = ({ isLiked, likesNumber, artId }) => {
  const [isLike, setIsLike] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(likesNumber || (isLiked ? 1 : 0));

  const dispatch = useDispatch();

  const successCallback = useCallback(() => {
    if (isLike) {
      setLikesCount(isLiked ? likesNumber - 1 : likesNumber);
      setIsLike(false);
    } else {
      setLikesCount(isLiked ? likesNumber : likesNumber + 1);
      setIsLike(true);
    }
  }, [isLike, isLiked, likesNumber]);

  const errorCallback = useCallback(() => {
    if (isLike) {
      toast.error('Dislike error');
    } else {
      toast.error('Like error');
    }
  }, [isLike]);

  const likeAction = useCallback(
    (art: number | string) => {
      dispatch(
        like({
          id: art,
          successCallback,
          errorCallback,
        }),
      );
    },
    [dispatch, errorCallback, successCallback],
  );

  const handleLike = useCallback(() => {
    likeAction(artId);
  }, [artId, likeAction]);

  return (
    <div className={cx(styles.likeWrapper)}>
      <Button
        className={cx(styles.likeBtn)}
        onClick={handleLike}
        icon={<HeartIcon className={cx('heart-icon', { 'active-heart': isLike })} />}
        color="transparent"
        padding="0"
      />
      <Text className={styles.likeCount} id="none" weight="bold">
        {numberFormatter(likesCount, 3)}
      </Text>
    </div>
  );
};
export default LikeButton;
