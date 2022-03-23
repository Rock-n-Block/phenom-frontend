import { URL } from 'appConstants';
import { GetLikedNFTsRequest } from 'types/requests';

import ajax from './ajax';

export default {
  getLikedNFTs: (params: GetLikedNFTsRequest) => {
    const { userId, page, network } = params;
    return ajax({
      method: 'get',
      url: URL.getLiked(userId),
      params: { network, page },
    });
  },
};
