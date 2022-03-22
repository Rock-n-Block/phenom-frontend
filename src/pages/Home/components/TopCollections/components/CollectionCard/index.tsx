import { FC } from 'react';

import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { Avatar, EllipsisText, Text } from 'components';

import styles from './styles.module.scss';

interface IProps {
  index?: number;
  avatar: string;
  id: number;
  name: string;
  price: string | number;
  profitIncrease?: string | number;
  className?: string;
}

const CollectionCard: FC<IProps> = ({
  index,
  avatar,
  id,
  name,
  price,
  profitIncrease,
  className,
}) => {
  const { t } = useTranslation('Home');
  return (
    <li className={cx(styles.collectionCard, className)}>
      {index && (
        <Text color="secondary" weight="bold" size="m">
          {index}
        </Text>
      )}
      <Avatar avatar={avatar} id={id} isCollection size={56} className={styles.avatar} />
      <div className={styles.info}>
        <EllipsisText>
          <Text weight="semibold" size="m">
            {name}
          </Text>
        </EllipsisText>
        <Text size="xs" weight="bold" color="middleGray" className={styles.price}>
          {t('TopCollections.FloorPrice')}:
          <Text size="xs" color="blue" weight="bold" className={styles.price}>
            {' '}
            {price} PHENOM
          </Text>
        </Text>
      </div>
      {profitIncrease && (
        <div className={styles.profitIncreaseWrapper}>
          <Text className={styles.profitIncreaseValue} size="m">
            {profitIncrease}%
          </Text>
        </div>
      )}
    </li>
  );
};
export default CollectionCard;
