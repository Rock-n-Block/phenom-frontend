import { useLanguage } from 'context';
import { VFC } from 'react';

import { Banner, Categories, TopCollections, Trending } from './components';

import styles from './styles.module.scss';

const Home: VFC = () => {
  const { hasNamespaceLoaded } = useLanguage();
  if (!hasNamespaceLoaded('Home')) {
    return <div>Loading</div>;
  }
  return (
    <div className={styles.home}>
      <Banner />
      <Trending />
      <Categories />
      <TopCollections />
    </div>
  );
};

export default Home;
