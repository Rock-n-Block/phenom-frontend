import { FC } from 'react';
import { Link } from 'react-router-dom';

import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';

import { Text } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import { categories } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  className?: string;
};

const Categories: FC<Props> = ({ className }) => {
  const tags = useShallowSelector(nftsSelector.getProp('categories'));
  return (
    <div className={cx(styles.categories, className)}>
      <div className={styles.gradient}>
        <img src={categories} className={styles.metaverse} alt="categories" />
      </div>
      <div className={styles.title}>
        <Text tag="h2" weight="semibold" align="center" id="Categories">
          Categories
        </Text>
      </div>
      <div className={styles.box}>
        {tags?.length ? (
          tags.map((tag: any) => (
            <Link className={styles.tag} to={routes.explore.filter(tag.name)}>
              <img alt="category" className={styles.image} src={tag.image} />
              <Text className={styles.text} weight="semibold">
                {tag.name}
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
