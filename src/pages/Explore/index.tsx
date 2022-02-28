import { VFC } from 'react';

import { useLanguage } from 'context';

import { Body, Title } from './components';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  const { hasNamespaceLoaded } = useLanguage();
  if (!hasNamespaceLoaded('Explore')) {
    return <div>Loading</div>;
  }
  return (
    <div className={styles.explore}>
      <Title />
      <Body />
    </div>
  );
};

export default Explore;
