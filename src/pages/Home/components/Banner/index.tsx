import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useLanguage } from 'context';

// import cx from 'classnames';
import { Button, Text } from 'components';

import { metaverse } from 'assets/img';

import styles from './styles.module.scss';

const Banner: FC = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'Banner' });
  const { setEntityPreferredLocale } = useLanguage();
  useEffect(() => {
    setTimeout(() => setEntityPreferredLocale('rus'), 2000);
  }, [setEntityPreferredLocale]);
  return (
    <div className={styles.banner}>
      <div className={styles.gradient}>
        <img src={metaverse} alt="metaverse" />
      </div>
      <div className={styles.bannerBody}>
        <Text weight="bold" className={styles.title}>
          {t('PhenomMetaverseMarketplace')}
        </Text>
        <Text size="m" className={styles.subtitle}>
          This is a revolutionary virtual universe in which users and their digital avatars can
          simultaneously interact in a 3D space: work, increase ratings, play, study, attend events,
          and also earn rewards for their activity.
        </Text>
        <div className={styles.bannerBtn}>
          <Button padding="extra-large">Explore</Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
