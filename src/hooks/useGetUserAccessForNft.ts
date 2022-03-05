import React from 'react';
import { INft, IOwner, TNullable } from 'types';

export default (nft: TNullable<INft>, userId: string | number) => {
  const isOwner = React.useMemo(() => {
    if (userId && nft && nft.owners) {
      if (Array.isArray(nft.owners)) {
        return !!nft.owners.find((owner: IOwner) => {
          return owner.id === userId;
        });
      }
      return userId === nft.owners.id;
    }
    return false;
  }, [nft, userId]);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (userId && nft) {
      if (
        nft.standart === 'ERC721' &&
        (nft.is_selling || nft.is_auc_selling || nft.is_timed_auc_selling) &&
        isOwner
      ) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        nft.sellers.find((seller) => seller.id === userId) &&
        isOwner
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanChangePrice = React.useMemo(() => {
    if (userId && nft) {
      if (nft.is_selling && isOwner) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanBuyNft = React.useMemo(() => {
    if (userId && nft && nft.price && nft.is_selling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        ((nft.sellers.length === 1 && nft.sellers[0].id !== userId) || nft.sellers.length > 1)
      ) {
        return true;
      }
    }
    return false;
  }, [nft, userId, isOwner]);

  const isUserCanEnterInAuction = React.useMemo(() => {
    if (userId && nft && (nft.is_auc_selling || nft?.is_timed_auc_selling) && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanEndAuction = React.useMemo(() => {
    if (
      userId &&
      nft &&
      nft.is_auc_selling &&
      !nft.is_timed_auc_selling &&
      nft.bids.length &&
      isOwner
    ) {
      if (nft.standart === 'ERC721') {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanPutOnSale = React.useMemo(() => {
    if (userId && nft && isOwner) {
      if (
        nft.standart === 'ERC721' &&
        !nft.is_selling &&
        !nft.is_auc_selling &&
        !nft.start_auction
      ) {
        return true;
      }
      if (nft.standart === 'ERC1155' && !nft.sellers.find((seller) => seller.id === userId)) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  return {
    isOwner,
    isUserCanRemoveFromSale,
    isUserCanBuyNft,
    isUserCanEnterInAuction,
    isUserCanPutOnSale,
    isUserCanEndAuction,
    isUserCanChangePrice,
  };
};
