import { useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import nftSelector from 'store/nfts/selectors';

import { useLanguage } from 'context';

import { Loader } from 'components';

import { Body, Title } from './components';

import { useGetTags, useShallowSelector } from 'hooks';
import { CategoryName } from 'types';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const params = useParams();
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


  const { hasNamespaceLoaded } = useLanguage();
  if (!hasNamespaceLoaded('Explore')) {
    return <Loader />;
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
