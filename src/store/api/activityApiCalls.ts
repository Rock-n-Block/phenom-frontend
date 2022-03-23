import { URL } from 'appConstants';

import ajax from './ajax';

export default {
  getTopCollections(params: { network: string }) {
    return ajax({
      method: 'get',
      url: URL.topCollections,
      params,
    });
  },
};
