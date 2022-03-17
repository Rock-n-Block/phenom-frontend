import { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type ISendPendingModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const SendPendingModal: VFC<ISendPendingModal> = ({ visible, onClose }) => {
  const title = (
    <Text align="center">
      STEP 2/2 <Text color="blue">SEND</Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Loader />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        Please press &quotSend&quot button in metamask extension
      </Text>
      <Text align="center" className={styles.text}>
        Your USDT will be transferred from your wallet to the contract address.
      </Text>
    </Modal>
  );
};

export default SendPendingModal;
