import { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type ISendPendingModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
  subtitleText?: string;
  subMessageText?: string;
};

const SendPendingModal: VFC<ISendPendingModal> = ({
  visible,
  onClose,
  withSteps = true,
  subtitleText = 'Please press "Send" button in MetaMask extension',
  subMessageText = '',
}) => {
  const title = (
    <Text className={styles.title} align="center" size="xl" weight="bold">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" color="blue">
        SEND
      </Text>
    </Text>
  );

  return (
    <Modal
      containerClassName={styles.container}
      visible={visible}
      onClose={onClose}
      title={title}
      maxWidth={628}
    >
      <div className={styles.icon}>
        <Loader />
      </div>
      {subtitleText && (
        <Text tag="h4" weight="semibold" align="center" className={styles.subtitle}>
          {subtitleText}
        </Text>
      )}
      {subMessageText && (
        <Text align="center" className={styles.text}>
          {subMessageText}
        </Text>
      )}
    </Modal>
  );
};

export default SendPendingModal;
