import { Button, DefaultInput, Modal, Text } from 'components';
import { useCallback, useState, VFC } from 'react';

import styles from './styles.module.scss';

type IBurnModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  isMultiple?: boolean;
};

const BurnModal: VFC<IBurnModal> = ({ visible, onClose, isMultiple }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  return (
    <Modal visible={visible} onClose={onClose} title="Burn">
      <Text>
        Are you sure to burn this token? This action cannot be undone. Token will be transfered to
        zero address
      </Text>
      {isMultiple ? (
        <DefaultInput
          name="amount"
          label="Amount"
          value={inputValue}
          setValue={handleInputChange}
          placeholder="Input text"
        />
      ) : (
        <></>
      )}
      <Button className={styles.button}>Burn</Button>
    </Modal>
  );
};

export default BurnModal;
