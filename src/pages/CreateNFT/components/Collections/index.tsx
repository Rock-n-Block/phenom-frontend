import { useCallback, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';

import { CollectionCard, Text } from 'components';

import { TSingleCollection } from 'types';

import { ReloadSVG } from 'assets/img';

import styles from './styles.module.scss';

interface ICollections {
  initCollections: TSingleCollection[];
  setSelectedCollection: (collections: TSingleCollection[]) => void;
  onRefresh?: () => void;
  fetching?: boolean;
}

const Collections: VFC<ICollections> = ({
  initCollections,
  setSelectedCollection,
  onRefresh,
  fetching = false,
}) => {
  const [collections] = useState(initCollections);
  const [selected, setSelected] = useState<TSingleCollection[]>([]);

  useEffect(() => {
    setSelectedCollection(selected);
  }, [selected, setSelectedCollection]);

  const isSelected = useCallback(
    (id: number) => selected.findIndex((s) => s.id === id) !== -1,
    [selected],
  );

  const setIsSelected = useCallback(
    (collection: TSingleCollection) => {
      if (isSelected(collection.id)) {
        const newSelected = selected.filter((c) => c.id !== collection.id);
        setSelected(newSelected);
      } else {
        setSelected([collection]);
      }
    },
    [isSelected, selected],
  );

  return (
    <section className={styles['collection-section__wrapper']}>
      <div className={styles['collection-section__wrapper__title']}>
        <Text tag="h4" weight="medium">
          Add collection
        </Text>
        {onRefresh && (
          <button
            disabled={fetching}
            className={styles['fetching-button']}
            type="button"
            onClick={onRefresh}
            title="refresh"
          >
            <ReloadSVG />
          </button>
        )}
      </div>
      <div className={styles['collection-section__wrapper__body']}>
        {collections.map((c) => (
          <CollectionCard
            key={c.id}
            collection={c}
            selectable
            setIsSelected={setIsSelected}
            isSelected={isSelected(c.id)}
          />
        ))}
      </div>
      <Link to="/create/collection" className={styles['collection-section__wrapper__add-body']}>
        <Text weight="bold" size="s">
          Create new collection
        </Text>
        <span className={styles['collection-section__wrapper__add-body__detail']}>&#43;</span>
      </Link>
    </section>
  );
};

export default Collections;
