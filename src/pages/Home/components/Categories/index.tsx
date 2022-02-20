import { FC } from 'react';

import cx from 'classnames';

import { H1, Text } from 'components';

import mockImg1 from './mockImg1.png';
import mockImg2 from './mockImg2.png';
import mockImg3 from './mockImg3.png';
import mockImg4 from './mockImg4.png';

import { categories, ellipse } from 'assets/img';

// import { routes } from 'appConstants';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const tags = [
  { title: 'Rooms', image: mockImg1 },
  { title: 'Area', image: mockImg2 },
  { title: 'Buildings ', image: mockImg3 },
  { title: 'Skins', image: mockImg4 },
];

const Categories: FC<Props> = ({ className }) => {
  const handleTagClick = (title: string) => {
    // history.push(routes.explore.filter(title === 'All NFTs' ? '' : title));
    console.log(title);
  };
  return (
    <div className={cx(styles.categories, className)}>
      <div className={styles.gradient}>
        <img src={categories} alt="categories" />
        <img src={ellipse} alt="ellipse" className={styles.ellipse} />
      </div>
      <div className={styles.title}>
        <H1 weight="bold" align="center">
          Categories
        </H1>
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
