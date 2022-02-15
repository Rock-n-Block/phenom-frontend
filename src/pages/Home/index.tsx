import { VFC } from 'react';

import { Header } from 'components';

import styles from './styles.module.scss';

const Home: VFC = () => {
  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
};

export default Home;
