import { FormEvent, useCallback, VFC } from 'react';

import cn from 'classnames';

import { Avatar, Checkbox, Text } from 'components';

import { TSingleCollection } from 'types';

import styles from './styles.module.scss';

interface ICollectionCard {
  collection: TSingleCollection;
  selectable?: boolean;
  setIsSelected?: (collection: TSingleCollection) => void;
  isSelected?: boolean;
}

/**
 * 
 * @param {TSingleCollection} collection - entity of the collection
 * @param {boolean} [selectable] - allows user to select card
 * @default selectable = false
 * @param {(collection: TSingleCollection) => void} [setIsSelected] - callback which will be called when card has been selected. Return collection
 * @param {boolean} [isSelected] - initial state of card
 * @default isSelected = false
 * @returns 
 */
const CollectionCard: VFC<ICollectionCard> = ({
  collection,
  selectable = false,
  setIsSelected,
  isSelected = false,
}) => {
  const onBlockClick = useCallback(
    (e: FormEvent<HTMLDivElement | HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
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
    >
      {selectable && (
        <Checkbox
          id={collection.id.toString()}
          value={isSelected}
          onChange={onBlockClick}
          className={styles['collection-card__wrapper__checkbox']}
        />
      )}
      <Avatar
        id={collection.id}
        avatar={collection.icon}
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
          <span className={styles['marked-text']}>
            {collection.price} {collection.currency}
          </span>
        </Text>
      </div>
    </div>
  );
};

export default CollectionCard;
