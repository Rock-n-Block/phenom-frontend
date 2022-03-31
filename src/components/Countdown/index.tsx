/* eslint-disable react/no-array-index-key */
import { VFC } from 'react';

import moment from 'moment';

import { Text } from 'components';

import { useTimeLeft } from 'hooks';

import { PlaceBidIcon } from 'assets/img';

import styles from './styles.module.scss';

export interface CountdownProps {
  endAuction: number;
  className?: string;
}

const Countdown: VFC<CountdownProps> = ({ endAuction }) => {
  const timeLeft = useTimeLeft(endAuction * 1000);

  if (!timeLeft) {
    return (
      <div className={styles.timedAucTitle}>
        <Text size="m" weight="semibold">
          Timed auction ended
        </Text>
      </div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div className={styles.timedAuc}>
      <div className={styles.timedAucTitle}>
        <PlaceBidIcon className={styles.timedAucIcon} />
        <Text size="m" weight="semibold">
          Sale ends at {moment(endAuction, 'X').format('MMMM Do YYYY, h:mma')}
        </Text>
      </div>
      <div className={styles.time}>
        <div className={styles.timeItem}>
          <Text size="xxl" color="blue" weight="semibold">
            {hours}
          </Text>
          <Text>Hours</Text>
        </div>
        <div className={styles.timeItem}>
          <Text size="xxl" color="blue" weight="semibold">
            {minutes}
          </Text>
          <Text>Minutes</Text>
        </div>
        <div className={styles.timeItem}>
          <Text size="xxl" color="blue" weight="semibold">
            {seconds}
          </Text>
          <Text>Seconds</Text>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
