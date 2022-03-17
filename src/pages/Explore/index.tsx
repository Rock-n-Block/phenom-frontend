import { useCallback, useEffect, useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchCollections } from 'store/nfts/actions';
import { clearCollections } from 'store/nfts/reducer';

import { useLanguage } from 'context';

import { Body, Title } from './components';

import { CategoryName } from 'types';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const activeCategory = useMemo(() => params.filterValue as CategoryName, [params.filterValue]);

  const handleSearchCollections = useCallback(() => {
    const requestData = { type: 'collections', page: 1 };
    dispatch(searchCollections({ requestData }));
  }, [dispatch]);

  useEffect(() => {
    handleSearchCollections();
  }, [handleSearchCollections]);

  useEffect(
    () => () => {
      dispatch(clearCollections());
    },
    [dispatch],
  );

  const { hasNamespaceLoaded } = useLanguage();
  if (!hasNamespaceLoaded('Explore')) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.explore}>
      <Title activeCategory={activeCategory} />
      <Body activeCategory={activeCategory} />
    </div>
  );
};

export default Explore;
