import { VFC } from 'react';

import cx from 'classnames';

import { Button, EllipsisText, LikeButton, Text } from 'components';

import styles from './styles.module.scss';

type INameAndLike = {
  name: string;
  artId: number;
  likeCount: number;
  isLiked?: boolean;
  inStockNumber?: number;
  youOwn?: string | number;
};

const NameAndLike: VFC<INameAndLike> = ({
  name,
  artId,
  likeCount,
  isLiked = false,
  inStockNumber,
  youOwn,
}) => {
  return (
    <div className={styles.nameAndLike}>
      <div className={styles.top}>
        <EllipsisText>
          <Text size="xxxxl" weight="semibold">
            {name}
          </Text>
        </EllipsisText>
        <Button className={cx(styles.button, styles.likeButton)} color="outline">
          <LikeButton
            countClassName={styles.likeCount}
            isLiked={isLiked}
            likesNumber={likeCount}
            artId={artId}
          />
        </Button>
      </div>
      <div className={styles.bottom}>
        <Text color="middleGray" weight="semibold" size="m" className={styles.bottomItem}>
          Id: {artId}
        </Text>
        {youOwn ? (
          <Text color="middleGray" weight="semibold" size="m" className={styles.bottomItem}>
            You own: {youOwn}
          </Text>
        ) : (
          <></>
        )}
        {inStockNumber ? (
          <Text color="middleGray" weight="semibold" size="m">
            In stock: {inStockNumber}
          </Text>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default NameAndLike;
