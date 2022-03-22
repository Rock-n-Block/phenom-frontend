export default {
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  getSelfCollection: '/account/self/collections/',
  getTrendingNfts: 'store/trending/',
  presearchNfts: 'store/presearch/',
  searchNfts: 'store/search/',
  getCategories: '/store/categories/',
  createNewToken: '/store/create_token/',
  createNewCollection: '/store/create_collection/',
  getTokenById: (id: string | number) => `/store/token/${id}/`,
  setOnAuction: (id: string | number) => `/store/token/${id}/set_on_auction/`,
  setOnSale: (id: string | number) => `/store/token/${id}/set_on_sale/`,
  buy: 'store/buy/',
  bid: 'store/bids/make_bid/',
  like: '/account/self/like/',
  removeReject: '/store/remove-reject/',
  endAuction: (id: number | string) => `/store/token/${id}/end_auction/`,
  verificateBet: (id: number | string) => `/store/token/${id}/verificate_bet/`,
  trackTransaction: 'store/track_transaction',
  editProfile: '/account/self/',
  trendingCollections: '/store/trending_collections/',
  trendingTokens: '/store/trending_tokens/',
  topCollections: '/activity/top-collections/',
  transfer: (id: number | string) => `/store/token/${id}/transfer`,
};
