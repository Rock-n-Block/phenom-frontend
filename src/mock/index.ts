import {
  categoriesImg1,
  categoriesImg2,
  categoriesImg3,
  categoriesImg4,
  nftCard,
  searchAvatar,
  topCollectionAvatar,
  trendingAvatar,
  userAvatar,
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
    1: {
      name: 'Nft NftNftNft name1',
      id: 1,
      creator: { id: 1, name: 'Alena', avatar: userAvatar },
      // inStockNumber: 2,
      img: nftCard,
      properties: [
        { label: 'Color', value: 'Yellow' },
        { label: 'Type', value: 'alien' },
        { label: 'Strength', value: '1000' },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likeCount: 1000,
      standart: 'ERC721',
      price: 5412266.7,
      USD_price: 2332.03,
      isTimedAuction: true,
      owners: [
        {
          id: 1,
          name: '',
          address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
          avatar: userAvatar,
        },
      ],
      collection: { avatar: topCollectionAvatar, id: 1, name: 'Collection Name1', price: '22343' },
    },
    2: {
      name: 'Nft name2',
      id: 2,
      creator: { id: 2, name: 'Sbeve', avatar: userAvatar },
      img: nftCard,
      properties: [{ label: 'Color', value: 'Red' }],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likeCount: 3123123,
      standart: 'ERC721',
      price: 26623123.7,
      USD_price: 21232.03,
      isAuction: true,
      owners: [
        {
          id: 1,
          name: '',
          address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
          avatar: userAvatar,
        },
      ],
      collection: {
        avatar: topCollectionAvatar,
        id: 2,
        name: 'Collection NameCollection NameCollection Name2',
        price: '23',
      },
    },
    3: {
      name: 'Nft name3',
      id: 3,
      creator: { id: 3, name: 'Y', avatar: userAvatar },
      inStockNumber: 22,
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
      USD_price: 22.03,
      owners: [
        {
          id: 1,
          name: '',
          address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
          avatar: userAvatar,
        },
        {
          id: 2,
          name: 'Name name',
          address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
          avatar: userAvatar,
        },
      ],
      collection: {
        avatar: topCollectionAvatar,
        id: 2,
        name: 'Collec3',
        price: '0.3',
      },
    },
  },
};

export default mock;
