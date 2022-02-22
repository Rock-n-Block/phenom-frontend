import { useCallback, useState, VFC } from 'react';

import { H1, TabLookingComponent } from 'components';

import { Filters } from './components';

import styles from './styles.module.scss';

const categories = [
  {
    title: 'Category №1',
    key: 'category_1',
  },
  {
    title: 'Category №2',
    key: 'category_2',
  },
  {
    title: 'Category №3',
    key: 'category_3',
  },
  {
    title: 'Category №4',
    key: 'category_4',
  },
  {
    title: 'Category №5',
    key: 'category_5',
  },
];

const Explore: VFC = () => {
  const [checkedCategory, setCheckedCategory] = useState(categories[0].key);

  const handleClickCategory = useCallback((value: string) => {
    setCheckedCategory(value);
  }, []);

  return (
    <div className={styles.explore}>
      <H1 align="center" className={styles.title}>
        Skins
      </H1>
      <TabLookingComponent
        tabs={categories}
        wrapClassName={styles.categories}
        action={(value) => handleClickCategory(value)}
        activeTab={checkedCategory}
        tabClassName={styles.category}
      />
      <Filters />
    </div>
  );
};

export default Explore;
