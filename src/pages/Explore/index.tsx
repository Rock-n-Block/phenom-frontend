import { useMemo, VFC } from 'react';
import { useParams } from 'react-router-dom';

import { useLanguage } from 'context';

import { Body, Title } from './components';

import { CategoryName } from 'types';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const params = useParams();
  const activeCategory = useMemo(() => params.filterValue as CategoryName, [params.filterValue]);
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
