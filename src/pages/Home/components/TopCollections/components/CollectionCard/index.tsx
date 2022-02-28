import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, EllipsisText, Text } from 'components';

import styles from './styles.module.scss';

interface IProps {
  index?: number;
  avatar: string;
  id: number;
  name: string;
  price: string;
  profitIncrease?: string | number;
}

const CollectionCard: FC<IProps> = ({ index, avatar, id, name, price, profitIncrease }) => {
  const { t } = useTranslation('Home');
  return (
    <li className={styles.collectionCard}>
      <Text color="secondary" weight="bold" size="m">
        {index}
      </Text>
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
            {price} PHETA
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
