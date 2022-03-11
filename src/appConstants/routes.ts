import { Categories } from "types";

export const routes = {
  home: {
    root: '/',
  },
  explore: {
    root: '/explore/:filterValue',
    filter: (fileterValue: Categories): string => `/explore/${fileterValue}`,
    input: (input: string): string => `/explore?text=${input}`,
  },
  nft: {
    link: (id: string | number): string => `/nft/${id}`,
    root: '/nft/:id',
  },
  collection: {
    link: (id: string | number): string => `/collection/${id}`,
    root: '/collection/:collectionId',
  },
  create: {
    root: '/create',
    single: '/create/single',
    multiple: '/create/multiple',
    collection: '/create/collection',
  },
  profile: {
    link: (
      id: string | number,
      tab?: 'for-sale' | 'owned' | 'favorites' | 'about-me' | 'collections' | 'sold' | 'bided',
    ): string => `/profile/${id}${tab ? `/${tab}` : ''}`,
    root: '/profile/:userId',
    edit: '/profile/edit',
  },
  lostPage: {
    root: '/404',
  },
  comingSoon: {
    root: '/soon',
  },
};
