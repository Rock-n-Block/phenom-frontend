import { VFC } from 'react';

import { OwnerList, UserBuy } from './components';

type IPayment = {
  isAuction?: boolean;
  isTimedAuction?: boolean;
  price?: string | number;
  USD_price?: string | number;
  // standart: 'ERC721' | 'ERC1155';
  standart: string;
  availableAmount?: number;
  start_auction?: number;
  end_auction?: number;
  highest_bidder?: any;
  isSelling: boolean;
};

const Payment: VFC<IPayment> = ({
  isAuction,
  isTimedAuction,
  price,
  USD_price,
  standart,
  availableAmount,
  end_auction,
  highest_bidder,
  isSelling,
}) => {
  return (
    <>
      {isSelling ? (
        <UserBuy
          standart={standart}
          isAuction={isAuction}
          isTimedAuction={isTimedAuction}
          price={price}
          USD_price={USD_price}
          availableAmount={availableAmount}
          end_auction={end_auction}
          highest_bidder={highest_bidder}
        />
      ) : (
        <OwnerList />
      )}
    </>
  );
};

export default Payment;
