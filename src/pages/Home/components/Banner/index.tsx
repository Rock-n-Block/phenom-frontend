import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// import cx from 'classnames';
import { Button, Text } from 'components';

import { routes } from 'appConstants';
import { CategoryName } from 'types';

import { metaverse } from 'assets/img';

import styles from './styles.module.scss';

const Banner: FC = () => {
  const { t } = useTranslation('Home');
  return (
    <div className={styles.banner}>
      <div className={styles.gradient}>
        <img className={styles.metaverse} src={metaverse} alt="metaverse" />
      </div>
      <div className={styles.bannerBody}>
        <Text
          tag="h1"
          align="center"
          weight="semibold"
          className={styles.title}
          id="PhenomMetaverseMarketplace"
        >
          Phenom Metaverse Marketplace
        </Text>
        <Text size="m" align="center" className={styles.subtitle} id="Banner.Subtitle">
          This is a revolutionary virtual universe in which users and their digital avatars can
          simultaneously interact in a 3D space: work, increase ratings, play, study, attend events,
          and also earn rewards for their activity.
        </Text>
        <div className={styles.bannerBtn}>
          <Button href={routes.explore.filter(CategoryName.allCategories)} padding="extra-large">
            {t('Banner.Explore')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
