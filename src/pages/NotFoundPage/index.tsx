import { routes } from 'appConstants';
import { notFound } from 'assets/img';
import { Button, Text } from 'components';
import { VFC } from 'react';

import styles from './styles.module.scss';

const Explore: VFC = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.notFound}>
        <img src={notFound} alt="404" className={styles.notFoundImg} />
        <div className={styles.text}>
          <Text size="xxl" weight="bold" align="center" className={styles.textTitle}>
            Page not found.
          </Text>
          <Text size="m" align="center">
            Our apologies, this is almost certainly not the page you were looking for.
          </Text>
        </div>
        <Button className={styles.notFoundBtn} href={routes.home.root}>
          Go to home page
        </Button>
      </div>
    </div>
  );
};

export default Explore;
