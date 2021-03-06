/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { getTopCollections } from 'store/collections/actions';
import { clearTopCollections } from 'store/collections/reducer';
import collectionsSelector from 'store/collections/selectors';
import userSelector from 'store/user/selectors';

import BigNumber from 'bignumber.js';
import cx from 'classnames';

import { Text } from 'components';

import { CollectionCard } from './components';

import { useShallowSelector } from 'hooks';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const TopCollections: FC<Props> = ({ className }) => {
  const chain = useShallowSelector(userSelector.getProp('chain'));
  const dispatch = useDispatch();
  const collections = useShallowSelector(collectionsSelector.getProp('topCollections'));

  const withoutDefault = useMemo(
    () => collections.filter((c: any) => !c.collection.isDefault),
    [collections],
  );

  const handleFetchTopCollections = useCallback(() => {
    dispatch(
      getTopCollections({
        network: chain,
      }),
    );
  }, [chain, dispatch]);

  useEffect(() => {
    handleFetchTopCollections();
  }, [handleFetchTopCollections]);

  useEffect(
    () => () => {
      dispatch(clearTopCollections());
    },
    [dispatch],
  );

  return (
    <div className={cx(styles.topCollections, className)}>
      <Text
        tag="h2"
        id="TopCollections.TopCollections"
        weight="semibold"
        className={styles.title}
        align="center"
      >
        Top collections
      </Text>
      {withoutDefault.length ? (
        <div className={styles.collections}>
          <ol
            className={styles.collectionsWrapper}
            style={{
              gridTemplateColumns: `repeat(${
                collections.length > 3 ? 3 : collections.length
              }, 1fr)`,
            }}
          >
            {withoutDefault.map((collection: any, index: number) => (
              <CollectionCard
                key={index}
                avatar={collection.collection?.avatar || ''}
                id={collection.collection?.url || 0}
                index={index + 1}
                name={collection.collection?.name || ''}
                price={
                  new BigNumber(collection?.floorPrice || '0').isEqualTo(0)
                    ? `< 0.01`
                    : new BigNumber(collection?.floorPrice).toString() || 0
                }
              />
            ))}
          </ol>
        </div>
      ) : (
        <Text id="TopCollections.NoCollections" size="xl" className={styles.noItems}>
          There are no collections
        </Text>
      )}
    </div>
  );
};

export default TopCollections;
