import { useCallback, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';

import { Button, DefaultInput, Modal, QuantityInput } from 'components';

import styles from './styles.module.scss';

type ITransferModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  isMultiple?: boolean;
  onSend: (address: string, amount: string | number) => void;
  max?: number;
};

const TransferModal: VFC<ITransferModal> = ({ visible, onClose, onSend, isMultiple, max = 1 }) => {
  const [inputValue, setInputValue] = useState('');
  const [amountValue, setAmountValue] = useState('1');
  const dispatch = useDispatch();

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  const handleAmountChange = useCallback((value: string) => {
    setAmountValue(value);
  }, []);

  const handleTransfer = useCallback(
    (name: string, amount: string) => {
      onSend(name, amount);
      dispatch(
        setModalProps({
          onSendAgain: () => onSend(name, amount),
        }),
      );
    },
    [dispatch, onSend],
  );

  return (
    <Modal visible={visible} onClose={onClose} title="Transfer">
      <DefaultInput
        name="address"
        label="Address"
        value={inputValue}
        setValue={handleInputChange}
        placeholder="Input address"
      />
      {isMultiple ? (
        <QuantityInput
          name="amount"
          label="Amount"
          value={amountValue}
          setValue={handleAmountChange}
          placeholder="Input text"
          minAmount={1}
          maxAmount={max}
          inputClassName={styles.amount}
        />
      ) : (
        <></>
      )}
      <Button
        onClick={() => handleTransfer(inputValue.trim(), amountValue.trim())}
        className={styles.button}
      >
        Send
      </Button>
    </Modal>
  );
};

export default TransferModal;
