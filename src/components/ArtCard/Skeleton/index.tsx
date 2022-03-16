import { VFC } from 'react';

import { Skeleton } from 'components';

import s from '../styles.module.scss';

interface IArtCardSkeleton {
  minHeight?: number;
}

const ArtCardSkeleton: VFC<IArtCardSkeleton> = ({ minHeight = 350 }) => {
  return (
    <div style={{ minHeight: `${minHeight}px`, overflow: 'hidden' }} className={s.artCard}>
      <Skeleton />
    </div>
  );
};

export default ArtCardSkeleton;
