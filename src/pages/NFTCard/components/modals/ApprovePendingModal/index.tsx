import { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type IApprovePendingModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const ApprovePendingModal: VFC<IApprovePendingModal> = ({ visible, onClose }) => {
  const title = (
    <Text align="center">
      STEP 1/2 <Text color="blue">APPROVE</Text>
    </Text>
  );

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        <Loader />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        Please press &quotApprove&quot button in metamask extension
      </Text>
      <Text align="center" className={styles.text}>
        BEP-20 tokens are deployed with functionality that allows other smart contracts to move
        tokens. By approving the smart contracts, it now has permission to execute the peer to peer
        swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens
        that are able to move when using MetaMask Swap.
      </Text>
    </Modal>
  );
};

export default ApprovePendingModal;
