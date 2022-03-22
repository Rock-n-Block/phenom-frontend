import { VFC } from 'react';

import { Loader, Modal, Text } from 'components';

import styles from './styles.module.scss';

type IApprovePendingModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
};

const ApprovePendingModal: VFC<IApprovePendingModal> = ({ visible, onClose, withSteps = true }) => {
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
        <Loader />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        Please press &quot;Approve&quot; button in metamask extension
      </Text>
    </Modal>
  );
};

export default ApprovePendingModal;
