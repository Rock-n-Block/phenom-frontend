export default {
  getMetamaskMessage: 'account/get_metamask_message/',
  metamaskLogin: 'account/metamask_login/',
  getProfileInfo: (id: string | number) => `/account/${id}/`,
  getSelfInfo: '/account/self/',
  getTrendingNfts: 'store/trending/',
  presearchNfts: 'store/presearch/',
  searchNfts: 'store/search/',
};
