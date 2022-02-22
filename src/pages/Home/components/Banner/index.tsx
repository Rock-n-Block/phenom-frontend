import { FC } from 'react';

// import cx from 'classnames';
import { Button, Text } from 'components';

import { metaverse } from 'assets/img';

import styles from './styles.module.scss';

const Banner: FC = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.gradient}>
        <img src={metaverse} alt="metaverse" />
      </div>
      <div className={styles.bannerBody}>
        <Text weight="bold" className={styles.title}>
          Phenom Metaverse Marketplace
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
