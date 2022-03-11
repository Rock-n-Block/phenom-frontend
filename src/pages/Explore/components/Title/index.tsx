import { VFC } from 'react';

import { Text } from 'components';

import { Categories } from 'types';

import styles from './styles.module.scss';

interface ITitle {
  activeCategory: Categories;
}

const Title: VFC<ITitle> = ({ activeCategory }) => {
  return (
    <Text tag="h1" id="Skins" align="center" className={styles.title}>
      {activeCategory}
    </Text>
  );
};

export default Title;
