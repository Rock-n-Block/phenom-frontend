import { FormEvent, useCallback, useEffect, useState, VFC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import { CollectionCard, Switch, Text } from 'components';

import { Collection } from 'types';

import { ReloadSVG } from 'assets/img';

import styles from './styles.module.scss';

interface ICollections {
  initCollections: Collection[];
  setSelectedCollection: (collections: Collection[]) => void;
  isCollectionsAdded: boolean;
  setIsCollectionsAdded: (state: boolean) => void;
  onRefresh?: () => void;
  fetching?: boolean;
  onBlur?: (e: FormEvent<HTMLDivElement>) => void;
  isClearing?: boolean;
  type: string;
}

const Collections: VFC<ICollections> = ({
  initCollections,
  setSelectedCollection,
  isCollectionsAdded,
  setIsCollectionsAdded,
  onRefresh,
  fetching = false,
  onBlur,
  isClearing,
  type,
}) => {
  const [collections, setCollections] = useState(initCollections);
  const [selected, setSelected] = useState<Collection[]>([]);

  useEffect(() => {
    setSelectedCollection(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const isSelected = useCallback(
    (url: string) => selected.findIndex((s) => s.url === url) !== -1,
    [selected],
  );

  useEffect(() => {
    if (isClearing) {
      setSelected([]);
    }
  }, [isClearing]);

  useEffect(() => {
    setCollections(initCollections);
  }, [initCollections]);

  const setIsSelected = useCallback(
    (collection: Collection) => {
      if (isSelected(collection.url || '')) {
        const newSelected = selected.filter((c) => c.url !== collection.url);
        setSelected(newSelected);
      } else {
        setSelected([collection]);
      }
    },
    [isSelected, selected],
  );

  useEffect(() => {
    setSelected([]);
  }, [isCollectionsAdded]);

  useEffect(() => {
    const defaultCollection = collections.find((c) => c.isDefault);
    if (defaultCollection) {
      if (!isCollectionsAdded && !isSelected(defaultCollection.url || '')) {
        setIsSelected(defaultCollection);
      }
    }
  }, [collections, isCollectionsAdded, isSelected, setIsSelected]);

  return (
    <section className={styles['collection-section__wrapper']}>
      <div className={styles['collection-section__wrapper__title']}>
        <Switch
          name="is-collection-added"
          checked={isCollectionsAdded}
          setChecked={setIsCollectionsAdded}
          className={styles['selector-btn']}
        />
        <Text tag="h4" weight="medium">
          Add collection
        </Text>
        {onRefresh && (
          <button
            disabled={fetching || !isCollectionsAdded}
            className={cn(styles['fetching-button'], { [styles['fetching-effect']]: fetching })}
            type="button"
            onClick={onRefresh}
            title="refresh"
          >
            <ReloadSVG />
          </button>
        )}
      </div>
      <div
        className={cn(styles['collection-section__wrapper__body'], {
          [styles['collections-active']]: isCollectionsAdded,
        })}
      >
        {collections
          .filter((c) => !c.isDefault)
          .map((c) => (
            <CollectionCard
              key={c.url}
              collection={c}
              selectable
              setIsSelected={setIsSelected}
              isSelected={isSelected(c.url || '')}
              onBlur={onBlur}
            />
          ))}
      </div>
      {isCollectionsAdded && (
        <Link
          to={`/create/collection/${type}`}
          className={cn(styles['collection-section__wrapper__add-body'])}
        >
          <Text weight="bold" size="s">
            Create new collection
          </Text>

          <span className={styles['collection-section__wrapper__add-body__detail']}>&#43;</span>
        </Link>
      )}
    </section>
  );
};

export default Collections;
