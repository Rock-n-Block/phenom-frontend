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
  set_on_auction: (id: string | number) => `/store/token/${id}/set_on_auction/`,
  set_on_sale: (id: string | number) => `/store/token/${id}/set_on_sale/`,
  buy: 'store/buy/',
  bid: 'store/bids/make_bid/',
  like: '/account/self/like/'
};
