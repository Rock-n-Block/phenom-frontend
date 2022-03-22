import { useCallback, useState, VFC } from 'react';

import { Button, DefaultInput, Modal } from 'components';

import styles from './styles.module.scss';

type ITransferModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  onSend?: () => void;
};

const TransferModal: VFC<ITransferModal> = ({ visible, onClose, onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Modal visible={visible} onClose={onClose} title="Transfer">
      <DefaultInput
        name="name"
        label="Name"
        value={inputValue}
        setValue={handleInputChange}
        placeholder="Input address"
      />
      <Button onClick={onSend} className={styles.button}>
        Send
      </Button>
    </Modal>
  );
};

export default TransferModal;
