import { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { iconError } from 'assets/img';

import styles from './styles.module.scss';

type IApproveErrorModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
  onApproveAgain?: () => void;
};

const ApproveErrorModal: VFC<IApproveErrorModal> = ({
  visible,
  onClose,
  withSteps = true,
  onApproveAgain,
}) => {
  const title = (
    <Text align="center" size="xl" weight="bold">
      {withSteps && 'STEP 1/2 '}
      <Text tag="span" color="blue">
        APPROVE
      </Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <img src={iconError} alt="error" />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        Something went wrong 😖. Please try again. If it doesn&apos;t help then try again later.
      </Text>
      <Button onClick={onApproveAgain} className={styles.button} padding="small">
        Approve again
      </Button>
    </Modal>
  );
};

export default ApproveErrorModal;
