import { VFC } from 'react';

import { Avatar, Text } from 'components';
import { sliceString } from 'utils';

import { CollectionCard } from 'pages/Home/components/TopCollections/components';

import { CollectionSlim, Ownership } from 'types';

import styles from './styles.module.scss';

type IOwnersAndCreators = {
  creator: any;
  owners: Array<any>;
  collection: CollectionSlim | null;
};

const OwnersAndCreators: VFC<IOwnersAndCreators> = ({ creator, owners, collection }) => {
  return (
    <div className={styles.ownersAndCreatorsWrapper}>
      <div className={styles.ownersAndCreators}>
        <div className={styles.creatorWrapper}>
          <Text color="darkenGray">Created by</Text>
          <div className={styles.creator}>
            <Avatar id={creator.id} avatar={creator.avatar} className={styles.avatar} />
            <Text>{sliceString(creator.name || creator.address)}</Text>
          </div>
        </div>
        <div className={styles.ownersWrapper}>
          <Text color="darkenGray">Owner</Text>
          {owners.map((owner: Ownership) => (
            <div className={styles.owner}>
              <Avatar id={owner.url || 0} avatar={owner.avatar || ''} className={styles.avatar} />
              <Text>{sliceString(owner.name || owner.address)}</Text>
            </div>
          ))}
        </div>
      </div>

      {collection && (
        <div className={styles.collection}>
          <Text>Collection</Text>
          <CollectionCard
            avatar={collection.avatar || ''}
            id={collection.url || 0}
            name={collection.name || ''}
            price={null}
            className={styles.collectionCard}
          />
        </div>
      )}
    </div>
  );
};

export default OwnersAndCreators;
