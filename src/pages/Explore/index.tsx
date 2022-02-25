import { VFC } from 'react';

import { Body, Title } from './components';

import styles from './styles.module.scss';

const Explore: VFC = () => {

  return (
    <div className={styles.explore}>
      <Title />
      <Body />
    </div>
  );
};

export default Explore;
