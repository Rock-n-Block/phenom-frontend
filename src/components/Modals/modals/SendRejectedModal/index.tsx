import { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { iconError } from 'assets/img';

import styles from './styles.module.scss';

type ISendRejectedModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
  onSendAgain?: () => void;
};

const SendRejectedModal: VFC<ISendRejectedModal> = ({
  visible,
  onClose,
  withSteps = true,
  onSendAgain,
}) => {
  const title = (
    <Text align="center" size="xl" weight="bold">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" color="blue">
        SEND
      </Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <img src={iconError} alt="error" />
      </div>
      <Text tag="h5" weight="semibold" align="center" className={styles.subtitle}>
        You rejected Send transaction in Metamask. Press Send again to start over or close this
        window.
      </Text>
      <Button onClick={onSendAgain} className={styles.button} padding="small">
        Send again
      </Button>
    </Modal>
  );
};

export default SendRejectedModal;
