const accountURLs = {
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getSelfInfo: '/account/self/',
  getSelfCollection: '/account/self/collections/',
  like: '/account/self/like/',
  editProfile: '/account/self/',
  trendingCollections: '/store/trending_collections/',
  trendingTokens: '/store/trending_tokens/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
};

const storeURLs = {
  getTrendingNfts: 'store/trending/',
  presearchNfts: 'store/presearch/',
  searchNfts: 'store/search/',
  getCategories: '/store/categories/',
  createNewToken: '/store/create_token/',
  createNewCollection: '/store/create_collection/',
  buy: 'store/buy/',
  bid: 'store/bids/make_bid/',
  trackTransaction: 'store/track_transaction/',
  mintReject: '/store/mint-reject/',
  buyReject: '/store/buy-reject/',
  getTokenById: (id: string | number) => `/store/token/${id}/`,
  setOnAuction: (id: string | number) => `/store/token/${id}/set_on_auction/`,
  setOnSale: (id: string | number) => `/store/token/${id}/set_on_sale/`,
  removeFromSale: (id: string | number) => `/store/token/${id}/remove_from_sale/`,
  endAuction: (id: number | string) => `/store/token/${id}/end_auction/`,
  verificateBet: (id: number | string) => `/store/token/${id}/verificate_bet/`,
  transfer: (id: number | string) => `/store/token/${id}/transfer/`,
  burn: (id: number | string) => `/store/token/${id}/burn/`,
  getSingleCollection: (id: number | string) => `/store/collection/${id}/`,
  getLiked: (id: number | string) => `/account/${id}/liked/`,
};

const activityURLs = {
  topCollections: '/activity/top-collections/',
};

export default {
  ...accountURLs,
  ...storeURLs,
  ...activityURLs,
};
