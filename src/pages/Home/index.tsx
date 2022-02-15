import { VFC } from 'react';

import { Header } from 'components';

import styles from './styles.module.scss';
import { Banner } from './components';

const Home: VFC = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Banner />
    </div>
  );
};

export default Home;
