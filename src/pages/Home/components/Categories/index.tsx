import { FC } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import mock from 'mock';

import { Text } from 'components';

import { routes } from 'appConstants';

import { categories } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const tags = [
  { title: 'Rooms', image: mock.categories.img1 },
  { title: 'Area', image: mock.categories.img2 },
  { title: 'Buildings ', image: mock.categories.img3 },
  { title: 'Skins', image: mock.categories.img4 },
];

const Categories: FC<Props> = ({ className }) => {
  return (
    <div className={cx(styles.categories, className)}>
      <div className={styles.gradient}>
        <img src={categories} className={styles.metaverse} alt="categories" />
      </div>
      <div className={styles.title}>
        <Text tag="h2" weight="bold" align="center" id="Categories">
          Categories
        </Text>
      </div>
      <div className={styles.box}>
        {tags.length ? (
          tags.map((tag: any) => (
            <Link className={styles.tag} to={routes.explore.filter(tag.title)}>
              <img alt="category" className={styles.image} src={tag.image} />
              <Text className={styles.text} weight="bold">
                {tag.title}
              </Text>
            </Link>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Categories;
