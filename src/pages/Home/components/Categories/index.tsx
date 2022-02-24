import { FC } from 'react';

import cx from 'classnames';
import mock from 'mock';

import { Text } from 'components';

import { categories } from 'assets/img';

// import { routes } from 'appConstants';
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
  const handleTagClick = (title: string) => {
    // history.push(routes.explore.filter(title === 'All NFTs' ? '' : title));
    console.log(title);
  };
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
            <div
              tabIndex={0}
              role="button"
              className={styles.tag}
              onKeyDown={() => {}}
              onClick={() => handleTagClick(tag.title)}
            >
              <img alt="category" className={styles.image} src={tag.image} />
              <Text className={styles.text} weight="bold">
                {tag.title}
              </Text>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Categories;
