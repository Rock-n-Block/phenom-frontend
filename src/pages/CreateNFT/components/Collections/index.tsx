import { useCallback, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';

import { CollectionCard, Text } from 'components';

import { Collection } from 'types';

import { ReloadSVG } from 'assets/img';

import styles from './styles.module.scss';

interface ICollections {
  initCollections: Collection[];
  setSelectedCollection: (collections: Collection[]) => void;
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
  const [selected, setSelected] = useState<Collection[]>([]);

  useEffect(() => {
    setSelectedCollection(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const isSelected = useCallback(
    (url: number) => selected.findIndex((s) => s.url === url) !== -1,
    [selected],
  );

  const setIsSelected = useCallback(
    (collection: Collection) => {
      if (isSelected(collection.url)) {
        const newSelected = selected.filter((c) => c.url !== collection.url);
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
            key={c.url}
            collection={c}
            selectable
            setIsSelected={setIsSelected}
            isSelected={isSelected(+c.url)}
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
