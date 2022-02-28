import { FC, useEffect } from 'react';

import { useLanguage } from 'context';

// import cx from 'classnames';
import { Button, Text } from 'components';

import { metaverse } from 'assets/img';

import styles from './styles.module.scss';
import { routes } from 'appConstants';

const Banner: FC = () => {
  const { setEntityPreferredLocale } = useLanguage();
  useEffect(() => {
    setTimeout(() => setEntityPreferredLocale('rus'), 2000);
  }, [setEntityPreferredLocale]);
  return (
    <div className={styles.banner}>
      <div className={styles.gradient}>
        <img className={styles.metaverse} src={metaverse} alt="metaverse" />
      </div>
      <div className={styles.bannerBody}>
        <Text weight="bold" className={styles.title} id="PhenomMetaverseMarketplace">
          Phenom Metaverse Marketplace
        </Text>
        <Text size="m" className={styles.subtitle}>
          This is a revolutionary virtual universe in which users and their digital avatars can
          simultaneously interact in a 3D space: work, increase ratings, play, study, attend events,
          and also earn rewards for their activity.
        </Text>
        <div className={styles.bannerBtn}>
          <Button href={routes.explore.root} padding="extra-large">
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
