import { VFC } from 'react';

import { Avatar, Text } from 'components';
import { sliceString } from 'utils';

import { CollectionCard } from 'pages/Home/components/TopCollections/components';

import styles from './styles.module.scss';

type IOwnersAndCreators = {
  creator: any;
  owners: Array<any>;
  collection: any;
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
          {owners.map((owner: any) => (
            <div className={styles.owner}>
              <Avatar id={owner.id} avatar={owner.avatar} className={styles.avatar} />
              <Text>{sliceString(owner.name || owner.address)}</Text>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.collection}>
        <Text>Collection</Text>
        <CollectionCard
          avatar={collection.avatar}
          id={collection.id}
          name={collection.name}
          price={collection.price}
          className={styles.collectionCard}
        />
      </div>
    </div>
  );
};

export default OwnersAndCreators;