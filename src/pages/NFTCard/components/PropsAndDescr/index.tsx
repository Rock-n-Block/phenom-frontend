import { VFC } from 'react';

import { Text } from 'components';

import styles from './styles.module.scss';

type IPropsAndDescr = {
  properties?: Array<any>;
  description?: string;
};

const PropsAndDescr: VFC<IPropsAndDescr> = ({ properties, description }) => {
  return (
    <div className={styles.propsAndDescr}>
      {properties && (
        <div className={styles.properties}>
          <Text size="xl" weight="semibold" className={styles.propertiesTitle}>
            Properties
          </Text>
          <div className={styles.propertiesList}>
            {properties.map(({ label, value }) => (
              <div className={styles.propertiesItem}>
                <Text color="blue" className={styles.label}>
                  {label}
                </Text>
                <Text className={styles.value}>{value}</Text>
              </div>
            ))}
          </div>
        </div>
      )}
      {description && (
        <div className={styles.description}>
          <Text size="xl" weight="semibold" color="gray" className={styles.descriptionTitle}>
            Description
          </Text>
          <Text size="m" color="darkenBlack">
            {description}
          </Text>
        </div>
      )}
    </div>
  );
};

export default PropsAndDescr;
