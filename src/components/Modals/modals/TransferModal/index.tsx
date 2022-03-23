import { useCallback, useState, VFC } from 'react';

import { Button, DefaultInput, Modal } from 'components';

import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';

type ITransferModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  isMultiple?: boolean;
  onSend: (address: string, amount: string | number) => void;
};

const TransferModal: VFC<ITransferModal> = ({ visible, onClose, onSend, isMultiple }) => {
  const [inputValue, setInputValue] = useState('');
  const [amountValue, setAmountValue] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    setAmountValue(value);
  }, []);

  dispatch(
    setModalProps({
      onSendAgain: () => onSend(inputValue.trim(), amountValue.trim()),
    }),
  );

  return (
    <Modal visible={visible} onClose={onClose} title="Transfer">
      <DefaultInput
        name="name"
        label="Name"
        value={inputValue}
        setValue={handleInputChange}
        placeholder="Input address"
      />
      {isMultiple ? (
        <DefaultInput
          name="amount"
          label="Amount"
          value={amountValue}
          setValue={handleAmountChange}
          placeholder="Input text"
          type="number"
        />
      ) : (
        <></>
      )}
      <Button
        onClick={() => onSend(inputValue.trim(), amountValue.trim())}
        className={styles.button}
      >
        Send
      </Button>
    </Modal>
  );
};

export default TransferModal;
