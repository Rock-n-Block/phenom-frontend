import React from 'react';
import { Ownership, TNullable, TokenFull } from 'types';

export default (nft: TNullable<TokenFull>, userId: string | number) => {
  const isOwner = React.useMemo(() => {
    if (userId && nft && nft.owners) {
      return !!nft.owners.find((owner: Ownership) => {
        return owner.url === userId;
      });
    }
    return false;
  }, [nft, userId]);

  const isUserCanRemoveFromSale = React.useMemo(() => {
    if (userId && nft) {
      if (
        nft.standart === 'ERC721' &&
        (nft.isSelling || nft.isAucSelling || nft.is_timed_auc_selling) &&
        isOwner
      ) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        nft.sellers?.find((seller: Ownership) => seller.url === userId) &&
        isOwner
      ) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanChangePrice = React.useMemo(() => {
    if (userId && nft) {
      if (nft.isSelling && isOwner) {
        return true;
      }
    }
    return false;
  }, [nft, isOwner, userId]);

  const isUserCanBuyNft = React.useMemo(() => {
    if (userId && nft && nft.price && nft.isSelling && nft.available !== 0) {
      if (nft.standart === 'ERC721' && !isOwner) {
        return true;
      }
      if (
        nft.standart === 'ERC1155' &&
        ((nft.sellers?.length === 1 && nft.sellers[0].url !== userId) ||
          (nft.sellers && nft.sellers.length > 1))
      ) {
        return true;
      }
    }
    return false;
  }, [nft, userId, isOwner]);

  const isUserCanEnterInAuction = React.useMemo(() => {
    if (userId && nft && (nft.isAucSelling || nft?.is_timed_auc_selling) && nft.available !== 0) {
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
      nft.isAucSelling &&
      !nft.is_timed_auc_selling &&
      nft.bids?.length &&
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
      if (nft.standart === 'ERC721' && !nft.isSelling && !nft.isAucSelling && !nft.startAuction) {
        return true;
      }
      if (nft.standart === 'ERC1155' && !nft.sellers?.find((seller) => seller.url === userId)) {
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
