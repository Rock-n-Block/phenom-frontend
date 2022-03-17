import { VFC } from 'react';

import modalsSelector from 'store/ui/selectors';

import { Clipboard, Modal, Text } from 'components';

import { useShallowSelector } from 'hooks';

import { iconSuccess } from 'assets/img';

import styles from './styles.module.scss';

type ISendSuccessModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const SendSuccessModal: VFC<ISendSuccessModal> = ({ visible, onClose }) => {
  const txHash = useShallowSelector(modalsSelector.getProp('txHash'));
  const title = (
    <Text align="center">
      STEP 2/2 <Text color="blue">SEND</Text>
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
      <Clipboard className={styles.clipboard} value={`https://bscscan.com/tx/${txHash}`} />
    </Modal>
  );
};

export default SendSuccessModal;
