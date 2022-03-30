import { FormEvent, useCallback, VFC } from 'react';

import cn from 'classnames';

import { Avatar, Checkbox, Text } from 'components';

import { Collection } from 'types';

import styles from './styles.module.scss';

interface ICollectionCard {
  collection: Collection;
  selectable?: boolean;
  setIsSelected?: (collection: Collection) => void;
  isSelected?: boolean;
  onBlur?: (e: FormEvent<HTMLDivElement>) => void;
}

/**
 *
 * @param {Collection} collection - entity of the collection
 * @param {boolean} [selectable] - allows user to select card
 * @default selectable = false
 * @param {(collection: Collection) => void} [setIsSelected] - callback which will be called when card has been selected. Return collection
 * @param {boolean} [isSelected] - initial state of card
 * @default isSelected = false
 * @returns
 */
const CollectionCard: VFC<ICollectionCard> = ({
  collection,
  selectable = false,
  setIsSelected,
  isSelected = false,
  onBlur,
}) => {
  const onBlockClick = useCallback(
    (e: FormEvent<HTMLDivElement | HTMLInputElement>) => {
      e.preventDefault();
      setIsSelected?.(collection);
    },
    [collection, setIsSelected],
  );
  return (
    <div
      className={cn(styles['collection-card__wrapper'], { [styles['selected-card']]: isSelected })}
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
      onClick={onBlockClick}
      onBlur={onBlur}
    >
      {selectable && (
        <Checkbox
          id={collection?.url?.toString()}
          value={isSelected}
          onChange={onBlockClick}
          className={styles['collection-card__wrapper__checkbox']}
        />
      )}
      <Avatar
        id={collection?.url || 0}
        avatar={collection.avatar || ''}
        isCollection
        size={56}
        className={styles['collection-card__wrapper__avatar']}
      />
      <div className={styles['collection-card__wrapper__info']}>
        <Text
          weight="bold"
          className={styles['collection-card__wrapper__info-title']}
          color="dark"
          size="m"
        >
          {collection.name}
        </Text>
        <Text
          size="xs"
          weight="medium"
          color="middleGray"
          className={styles['collection-card__wrapper__info-subtitle']}
        >
          Floor price:{' '}
          <span className={styles['marked-text']}>{collection.floorPrice || 0} PHETA</span>
        </Text>
      </div>
    </div>
  );
};

export default CollectionCard;
