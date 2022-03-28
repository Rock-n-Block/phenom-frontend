import { URL } from 'appConstants';
import { createTokenResponse, Token } from 'types';
import { CreateCollectionAction, RejectAction } from 'types/requests';

import ajax from './ajax';

export default {
  createNewToken(token: Token) {
    return ajax<createTokenResponse>({
      method: 'post',
      url: URL.createNewToken,
      data: token,
    });
  },
  createNewCollection({ collection, network }: CreateCollectionAction) {
    return ajax({
      method: 'post',
      url: URL.createNewCollection,
      params: { network },
      data: collection,
    });
  },
  mintReject({ id, owner }: RejectAction) {
    return ajax({
      method: 'post',
      url: URL.mintReject,
      data: { id, owner },
    });
  },
};
