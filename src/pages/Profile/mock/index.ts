import mock from 'mock';

import { IProfile, NFT } from 'types';

import avatarURL from './avatar.png';

export const profile: IProfile = {
  id: 1,
  avatarURL,
  name: 'Pavel M.',
  balance: '0.12',
  currency: 'PHETA',
  address: '0xbFF3aEB38F9a632aFade5726D04b2480C11cdE27',
  socials: {
    email: 'phenom@mail.com',
    site: 'phenom.io',
    twitter: '@phenom',
    instagram: '@phenom',
  },
  description:
    'I’am from Indianapolis, IN, USA. I create all my art physically using lasers, glass, mirrors and water - then capture them digitally with my phone. I record raw vids, and I also make laser vid edits synched to music. I make most of my lasers, and i do all this in my walk-in closet. Feel free to hit me up with any questions!',
};

export const nftCards: NFT[] = [
  {
    artId: '0342348',
    name: 'Nft name',
    price: '54266.7',
    img: mock.trending,
    asset: 'PHETA',
    author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: mock.user,
    authorId: 1,
    bids: [1],
    isAuction: true,
    USD_price: '22.03',
  },
  {
    artId: '0342348',
    name: 'Nft name',
    price: '54266.7',
    img: mock.trending,
    asset: 'PHETA',
    author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: mock.user,
    authorId: 1,
    bids: [],
    isAuction: false,
    USD_price: '22.03',
  },
  {
    artId: '0342348',
    name: 'Nft name',
    price: '54266.7',
    img: mock.trending,
    asset: 'PHETA',
    author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
    authorAvatar: mock.user,
    authorId: 1,
    bids: [],
    isAuction: true,
    USD_price: '22.03',
  },
];
