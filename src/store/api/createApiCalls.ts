import { URL } from 'appConstants';
import { createTokenResponse, Token } from 'types';
import { CreateCollectionAction, RemoveRejectAction } from 'types/requests';

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
  removeReject({ id, owner }: RemoveRejectAction) {
    return ajax({
      method: 'post',
      url: URL.removeReject,
      data: { id, owner },
    });
  },
};
