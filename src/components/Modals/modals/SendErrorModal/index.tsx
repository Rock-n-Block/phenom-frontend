import { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { iconError } from 'assets/img';

import styles from './styles.module.scss';

type ISendErrorModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  onTryAgain: () => void;
  withSteps?: boolean;
  error?: string;
  errorCode?: string;
};

const SendErrorModal: VFC<ISendErrorModal> = ({
  visible,
  onClose,
  onTryAgain,
  error,
  errorCode,
  withSteps = true,
}) => {
  const title = (
    <Text align="center" size="xl" weight="bold">
      {withSteps && 'STEP 2/2 '}
      <Text tag="span" color="blue">
        SEND
      </Text>
    </Text>
  );
  console.log(error);
  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <img src={iconError} alt="error" />
      </div>
      <Text tag="h5" weight="semibold" align="center" className={styles.subtitle}>
        Something went wrong 😖. Please try again. If it doesn&apos;t help then try again later.
      </Text>
      {errorCode && (
        <Text color="error" align="center" size="m">
          Error code - {errorCode}
        </Text>
      )}
      <Button onClick={onTryAgain} className={styles.button} padding="small">
        Try again
      </Button>
    </Modal>
  );
};

export default SendErrorModal;
