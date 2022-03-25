import { useCallback, useState, VFC } from 'react';

import { Button, DefaultInput, Modal } from 'components';

import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';

type IQuantityModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  tokenName: string;
  onSend: (amount: string) => void;
  max?: number | string;
};

const QuantityModal: VFC<IQuantityModal> = ({ visible, onClose, onSend, tokenName, max }) => {
  const [amountValue, setAmountValue] = useState('');
  const dispatch = useDispatch();

  const handleAmountChange = useCallback((value: string) => {
    setAmountValue(value);
  }, []);

  dispatch(
    setModalProps({
      onSendAgain: () => onSend(amountValue.trim()),
    }),
  );

  return (
    <Modal visible={visible} onClose={onClose} title={`You are about to buy ${tokenName}`}>
      <DefaultInput
        name="amount"
        label="Amount"
        value={amountValue}
        setValue={handleAmountChange}
        placeholder="Input text"
        type="number"
        min={1}
        max={max}
      />

      <Button onClick={() => onSend(amountValue.trim())} className={styles.button}>
        Send
      </Button>
    </Modal>
  );
};

export default QuantityModal;
