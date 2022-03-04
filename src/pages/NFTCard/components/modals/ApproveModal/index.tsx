import { useCallback, useEffect, useMemo, useState, VFC } from 'react';

import { Button, Loader, Modal, Text, Clipboard } from 'components';

import styles from './styles.module.scss';
import { iconError, iconSuccess } from 'assets/img';

type ITransferModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
};

const TransferModal: VFC<ITransferModal> = ({ visible, onClose }) => {
  const [step, setStep] = useState(1);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const title = useMemo(() => {
    return (
      <Text align="center">
        STEP {step}/2 {isApproved ? 'SEND' : 'APPROVE'}
      </Text>
    );
  }, [isApproved, step]);

  const subtitle = useMemo(() => {
    let titleElement;
    if (step === 1) {
      titleElement = isRejected
        ? 'You rejected Approve transaction in Metamask. Press Approve again to start over or close this window.'
        : 'Please press "Approve" button in metamask extension';
    }
    if (step === 2) {
      if (!isApproved && !isRejected) {
        titleElement = 'Please press "Send" button in Metamask extension';
      }
      if (isApproved && !isRejected) {
        titleElement = 'Sent';
      }
      if (isRejected) {
        titleElement =
          'You rejected Send transaction in Metamask. Press Send again to start over or close this window.';
      }
    }

    return titleElement;
  }, [isApproved, isRejected, step]);

  const text = useMemo(() => {
    let textElement;
    if (step === 1) {
      textElement =
        'BEP-20 tokens are deployed with functionality that allows other smart contracts to move tokens. By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf. The Spend Limit permission is the total amount of tokens that are able to move when using MetaMask Swap.';
    }
    if (step === 2) {
      if (!isApproved && !isRejected) {
        textElement = 'Your USDT will be transferred from your wallet to the contract address';
      }
      if (isApproved && !isRejected) {
        textElement = 'It takes some time for transaction to get confirmed.';
      }
      if (isRejected) {
        textElement = '';
      }
    }

    return textElement;
  }, [isApproved, isRejected, step]);

  const handleApproveAgain = useCallback(() => {
    setStep(2);
    setIsRejected(false);
    setIsLoading(true);
  }, []);

  const handleSendAgain = useCallback(() => {
    setIsApproved(true);
    setIsRejected(false);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let timeout: any;
    if (visible) {
      timeout = setTimeout(() => {
        setIsRejected(true);
        setIsLoading(false);
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  useEffect(() => {
    let timeout: any;
    if (step === 2 && !isRejected && !isApproved) {
      timeout = setTimeout(() => {
        setIsRejected(true);
        setIsLoading(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isApproved, isRejected, step]);

  return (
    <Modal visible={visible} onClose={onClose} title={title} maxWidth={628}>
      <div className={styles.icon}>
        {isLoading && <Loader />}
        {isRejected && !isLoading && <img src={iconError} alt="error" />}
        {step === 2 && !isLoading && isApproved && <img src={iconSuccess} alt="error" />}
      </div>
      {subtitle && (
        <Text size="xl" weight="semibold" align="center" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}
      {text && (
        <Text align="center" className={styles.text}>
          {text}
        </Text>
      )}
      {step === 1 && isRejected && (
        <Button className={styles.button} padding="small" onClick={handleApproveAgain}>
          Approve again
        </Button>
      )}
      {step === 2 && isRejected && (
        <Button className={styles.button} padding="small" onClick={handleSendAgain}>
          Send again
        </Button>
      )}
      {step === 2 && isApproved && (
        <Clipboard
          className={styles.clipboard}
          value="https://bscscan.com/tx/0xde069b4b27c870e85960xde069b4b27c870e85960xde069b4b27c870e8596"
        />
      )}
    </Modal>
  );
};

export default TransferModal;
