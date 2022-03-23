import { VFC } from 'react';

import modalsSelector from 'store/modals/selectors';
import userSelector from 'store/user/selectors';

import { Clipboard, Modal, Text } from 'components';
import { chains } from 'config';

import { useShallowSelector } from 'hooks';

import { iconSuccess } from 'assets/img';

import styles from './styles.module.scss';

type ISendSuccessModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  withSteps?: boolean;
};

const SendSuccessModal: VFC<ISendSuccessModal> = ({ visible, onClose, withSteps = true }) => {
  const activeModal = useShallowSelector(modalsSelector.getProp('modalState'));
  const chain = useShallowSelector(userSelector.getProp('chain'));
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
        <img src={iconSuccess} alt="error" />
      </div>
      <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
        Sent
      </Text>
      <Text align="center" className={styles.text}>
        It takes some time for transaction to get confirmed.
      </Text>
      {activeModal.txHash ? (
        <Clipboard className={styles.clipboard} value={`${chains[chain].scanner}tx/${activeModal.txHash}`} />
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default SendSuccessModal;
