import { VFC } from 'react';

import { Button, Modal, Text } from 'components';

import { iconError } from 'assets/img';

import styles from './styles.module.scss';

type IApproveRejectedModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const ApproveRejectedModal: VFC<IApproveRejectedModal> = ({ visible, onClose }) => {
  const title = (
    <Text align="center">
      STEP 1/2 <Text color="blue">APPROVE</Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <img src={iconError} alt="error" />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        You rejected Approve transaction in Metamask. Press Approve again to start over or close
        this window.
      </Text>
      <Text align="center" className={styles.text}>
        BEP-20 tokens are deployed with functionality that allows other smart contracts to move
        tokens. By approving the smart contracts, it now has permission to execute the peer to peer
        swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens
        that are able to move when using MetaMask Swap.
      </Text>
      <Button className={styles.button} padding="small">
        Approve again
      </Button>
    </Modal>
  );
};

export default ApproveRejectedModal;
