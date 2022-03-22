import { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type ISendPendingModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
};

const SendPendingModal: VFC<ISendPendingModal> = ({ visible, onClose, withSteps = true }) => {
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
      <Text tag="h4" weight="semibold" align="center" className={styles.subtitle}>
        Please press &quot;Send&quot; button in MetaMask extension
      </Text>
      <Text align="center" className={styles.text}>
        Your USDT will be transferred from your wallet to the contract address.
      </Text>
    </Modal>
  );
};

export default SendPendingModal;
