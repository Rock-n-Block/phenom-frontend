import { VFC } from 'react';

import { Banner, Categories, TopCollections, Trending } from './components';

import styles from './styles.module.scss';

const Home: VFC = () => {
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
