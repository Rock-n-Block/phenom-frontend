import { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { iconError } from 'assets/img';

import styles from './styles.module.scss';

type ISendRejectedModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const SendRejectedModal: VFC<ISendRejectedModal> = ({ visible, onClose }) => {
  const title = (
    <Text align="center">
      STEP 2/2 <Text color="blue">SEND</Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <img src={iconError} alt="error" />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        You rejected Send transaction in Metamask. Press Send again to start over or close this
        window.
      </Text>
      <Button className={styles.button} padding="small">
        Send again
      </Button>
    </Modal>
  );
};

export default SendRejectedModal;
