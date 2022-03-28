import { VFC } from 'react';

import mock from 'mock';

import { Avatar, Button, Modal } from 'components';

import { DEFAULT_CURRENCY } from 'appConstants';
import { Ownership } from 'types';

import styles from './styles.module.scss';

type ISellersModal = {
  visible: boolean;
  onClose: (value: boolean) => void;
  sellers?: Ownership[];
  handleChooseSeller: (id: string) => void;
};

const SellersModal: VFC<ISellersModal> = ({ visible, onClose, sellers, handleChooseSeller }) => {
  return (
    <Modal visible={visible} onClose={onClose} title={`Sellers (${sellers?.length})`}>
      <div className={styles.sellers}>
        {sellers?.length &&
          sellers.map((seller: Ownership) => (
            <div className={styles.item} key={seller.url || 0}>
              <div className={styles.itemWrapper}>
                <Avatar id={seller.url || 0} avatar={seller.avatar || mock.user} />
                <div className="">
                  <div className={styles.itemName}>{seller?.name}</div>
                  <div className={styles.itemQuantity}>{`${seller.sellingQuantity} token`}</div>
                </div>
              </div>
              <div className={styles.itemWrapper}>
                <div className={styles.currency}>{`${seller.price} ${DEFAULT_CURRENCY}`}</div>
                <Button
                  onClick={() => handleChooseSeller(seller.url || '0')}
                  className={styles.btn}
                  padding="small"
                >
                  Buy
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Modal>
  );
};

export default SellersModal;
