import {
  categoriesImg1,
  categoriesImg2,
  categoriesImg3,
  categoriesImg4,
  searchAvatar,
  topCollectionAvatar,
  trendingAvatar,
  userAvatar,
  nftCard,
} from './img';

const mock = {
  categories: {
    img1: categoriesImg1,
    img2: categoriesImg2,
    img3: categoriesImg3,
    img4: categoriesImg4,
  },
  search: searchAvatar,
  user: userAvatar,
  trending: trendingAvatar,
  topCollection: topCollectionAvatar,
  nftCard: {
    name: 'Nft name',
    id: 342348,
    inStockNumber: 2,
    img: nftCard,
    properties: [
      { label: 'Color', value: 'Blue' },
      { label: 'Type', value: 'humanoid' },
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    likeCount: 3,
    standart: 'ERC1155',
    price: 54266.7,
    USD_price: 22.03
  },
};

export default mock;
