/* eslint-disable react/no-array-index-key */
import { FC } from 'react';

import BigNumber from 'bignumber.js';
import cx from 'classnames';
import mock from 'mock';

import { H1, Text } from 'components';

import { CollectionCard } from './components';

// import { useFetchTopCollections } from 'hooks';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const collections = [
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
  { collection: { avatar: mock.topCollection, id: 0, name: 'Collection Name' }, price: '23' },
];

const TopCollections: FC<Props> = ({ className }) => {
  // const { collections } = useFetchTopCollections(period);
  return (
    <div className={cx(styles.topCollections, className)}>
      <H1 weight="bold" className={styles.title} align="center">
        Top collections
      </H1>
      {collections.length ? (
        <div className={styles.collections}>
          <ol
            className={styles.collectionsWrapper}
            style={{
              gridTemplateRows: `repeat(${collections.length > 3 ? 3 : collections.length}, 1fr)`,
            }}
          >
            {collections.map((collection, index) => (
              <CollectionCard
                key={index}
                avatar={collection.collection.avatar}
                id={collection.collection.id}
                index={index + 1}
                name={collection.collection.name}
                price={new BigNumber(collection.price).isEqualTo(0) ? '< $0.01' : collection.price}
              />
            ))}
          </ol>
        </div>
      ) : (
        <Text size="xl" className={styles.noItems}>
          There are no collections
        </Text>
      )}
    </div>
  );
};

export default TopCollections;
