import { VFC } from 'react';

import { useLanguage } from 'context';

import { Loader } from 'components';

import { Banner, Categories, TopCollections, Trending } from './components';

import styles from './styles.module.scss';

const Home: VFC = () => {
  const { isReady } = useLanguage();
  if (!isReady) {
    return <Loader />;
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
