import { useCallback, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { setModalProps } from 'store/modals/reducer';

import { Button, Modal, QuantityInput } from 'components';

import styles from './styles.module.scss';

type IQuantityModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  tokenName: string;
  onSend: (amount: string) => void;
  max?: number | string;
};

const QuantityModal: VFC<IQuantityModal> = ({ visible, onClose, onSend, tokenName, max }) => {
  const [amountValue, setAmountValue] = useState('1');
  const dispatch = useDispatch();

  const handleAmountChange = useCallback((value: string) => {
    setAmountValue(value);
  }, []);

  dispatch(
    setModalProps({
      onSendAgain: () => onSend(amountValue),
    }),
  );

  return (
    <Modal visible={visible} onClose={onClose} title={`You are about to buy ${tokenName}`}>
      <QuantityInput
        name="amount"
        label="Amount"
        value={amountValue}
        setValue={handleAmountChange}
        placeholder="Input text"
        minAmount={1}
        maxAmount={Number(max) || 1}
      />

      <Button onClick={() => onSend(amountValue)} className={styles.button}>
        Send
      </Button>
    </Modal>
  );
};

export default QuantityModal;
