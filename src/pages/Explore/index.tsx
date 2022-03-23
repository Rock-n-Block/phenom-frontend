import { useCallback, useEffect, useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { searchCollections } from 'store/collections/actions';
import { clearCollections } from 'store/collections/reducer';
import nftSelector from 'store/nfts/selectors';

import { useLanguage } from 'context';

import { Body, Title } from './components';

import { useGetTags, useShallowSelector } from 'hooks';
import { CategoryName } from 'types';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const activeCategoryName = useMemo(
    () => params.filterValue as CategoryName,
    [params.filterValue],
  );
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const activeCategory = useMemo(
    () =>
      categories?.filter((categoryOption: any) => categoryOption.name === activeCategoryName)[0],
    [activeCategoryName, categories],
  );
  const { tags, activeTag, handleSetActiveTag } = useGetTags(activeCategoryName, categories);

  const handleSearchCollections = useCallback(() => {
    const requestData: any = { type: 'collections', page: 1 };
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
      <Title activeCategory={activeCategory?.name || CategoryName.allCategories} />
      <Body
        activeCategory={activeCategory}
        tags={tags}
        activeTag={activeTag}
        handleSetActiveTag={handleSetActiveTag}
      />
    </div>
  );
};

export default Explore;
