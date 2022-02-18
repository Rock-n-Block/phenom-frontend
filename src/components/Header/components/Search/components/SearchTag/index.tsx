import { VFC } from 'react';

import cx from 'classnames';

import { Text } from 'components';

import styles from './styles.module.scss';

type Props = {
  image: string;
  title: string;
  className?: string;
};

const SearchTag: VFC<Props> = ({ image, title, className }) => (
  <div className={cx(styles.searchTag, className)}>
    <div className={styles.searchTagFlexContainer}>
      <img className={styles.searchTagImg} src={image} alt="art" />
      <div>
        <Text size="m" weight="medium">
          {title}
        </Text>
      </div>
    </div>
  </div>
);

export default SearchTag;
