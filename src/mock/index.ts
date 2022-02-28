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
    img: nftCard,
    properties: [
      { label: 'Color', value: 'Blue' },
      { label: 'Type', value: 'humanoid' },
    ],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export default mock;
