import { VFC } from 'react';

import { Text } from 'components';

import styles from './styles.module.scss';

const Title: VFC = () => {
  return (
    <Text tag="h1" id="Skins" align="center" className={styles.title}>
      Skins
    </Text>
  );
};

export default Title;
