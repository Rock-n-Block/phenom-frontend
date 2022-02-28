import { VFC } from 'react';

import { Text } from 'components';

import styles from './styles.module.scss';
import mock from 'mock';

const NFTCard: VFC = () => {
  return (
    <div className={styles.nftCard}>
      <div className={styles.left}>
        <div className={styles.nftCardImgWrapper}>
          <img src={mock.nftCard.img} alt="nftCard" className={styles.nftCardImg} />
        </div>
        <div className={styles.properties}>
          <Text size="xl" weight="semibold" className={styles.propertiesTitle}>
            Properties
          </Text>
          {mock.nftCard.properties.map(({ label, value }) => (
            <div className={styles.propertiesItem}>
              <Text color="blue" className={styles.label}>
                {label}
              </Text>
              <Text className={styles.value}>{value}</Text>
            </div>
          ))}
        </div>
        <div className={styles.description}>
          <Text size="xl" weight="semibold" color="gray" className={styles.propertiesTitle}>
            Description
          </Text>
          <Text size="m" color="darkenBlack">
            {mock.nftCard.description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
