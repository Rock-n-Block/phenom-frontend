/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import { ArtCard, H1, Text } from 'components';

import avatar from '../../../../components/Header/components/User/mockAvatar.png';
import { TitleDropdown } from './components';

import { useWindowSize } from 'hooks';

import 'swiper/swiper.less';
import mockNft1 from './mockNft1.png';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import styles from './styles.module.scss';
// import { storeApi } from 'services';
// import { routes } from 'appConstants';

const nftTags = [
  { title: 'All NFT' },
  { title: 'Rooms' },
  { title: 'Area' },
  { title: 'Buildings ' },
  { title: 'Skins ' },
];

type Props = {
  className?: string;
};
const Trending: FC<Props> = ({ className }) => {
  const [title, setTitle] = useState<any>({ title: 'All NFT' });
  const [nfts, setNfts] = useState<any[]>([]);
  const [numberOfSlide, setNumberOfSlide] = useState(3);
  const { width } = useWindowSize();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const slidesToShow = (widthValue: number) => {
    if (widthValue < 1050) {
      return 1;
    }
    return 3;
  };

  SwiperCore.use([Navigation, Pagination]);

  useEffect(() => {
    setNumberOfSlide(slidesToShow(width));
  }, [width]);

  const fetchTrendingNfts = useCallback(() => {
    setNfts([
      {
        artId: '0342348',
        name: 'Nft name',
        price: '54266.7',
        img: mockNft1,
        asset: 'PHETA',
        author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
        authorAvatar: avatar,
        authorId: 1,
        bids: [1],
        isAuction: true,
        USD_price: 22.03,
      },
      {
        artId: '0342348',
        name: 'Nft name',
        price: '54266.7',
        img: mockNft1,
        asset: 'PHETA',
        author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
        authorAvatar: avatar,
        authorId: 1,
        isAuction: false,
        USD_price: 22.03,
      },
      {
        artId: '0342348',
        name: 'Nft name',
        price: '54266.7',
        img: mockNft1,
        asset: 'PHETA',
        author: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4',
        authorAvatar: avatar,
        authorId: 1,
        bids: [],
        isAuction: true,
        USD_price: 22.03,
      },
    ]);
    // storeApi
    //   .getTrendingCollections(title.title === 'All NFTs' ? '' : title.title)
    //   .then(({ data }: any) => setNfts(data.filter((col: any) => !col.is_default)))
    //   .catch((err: any) => console.log('error', err));
  }, []);

  useEffect(() => {
    fetchTrendingNfts();
  }, [fetchTrendingNfts]);
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.notableDrops, className)}>
        <H1 weight="bold" className={styles.title} align="center">
          Trending in{' '}
          {nftTags.length && <TitleDropdown value={title} setValue={setTitle} options={nftTags} />}
        </H1>
        {nfts.length ? (
          <div className={cx(styles.drops, { [styles.row]: nfts.length <= 2 })}>
            {nfts.length > 2 ? (
              <>
                <div ref={prevRef} className="swiper-button-prev" />
                <div ref={nextRef} className="swiper-button-next" />
                <Swiper
                  spaceBetween={30}
                  centeredSlides
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  pagination
                  slidesPerView={numberOfSlide}
                  loop
                  className={styles.swiper}
                  onSwiper={(swiper) => {
                    // Delay execution for the refs to be defined
                    setTimeout(() => {
                      // Override prevEl & nextEl now that refs are defined
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      swiper.params.navigation.prevEl = prevRef.current;
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      swiper.params.navigation.nextEl = nextRef.current;

                      // Re-init navigation
                      swiper.navigation.destroy();
                      swiper.navigation.init();
                      swiper.navigation.update();
                    });
                  }}
                >
                  {nfts.map((nft) => {
                    const {
                      artId,
                      name,
                      price,
                      img,
                      asset,
                      author,
                      authorAvatar,
                      authorId,
                      bids,
                      isAuction,
                      USD_price,
                    } = nft;
                    return (
                      <SwiperSlide key={nft.id}>
                        <Link to="/" className={styles.drop}>
                          <ArtCard
                            artId={artId}
                            name={name}
                            price={price}
                            imageMain={img}
                            asset={asset}
                            author={author}
                            authorAvatar={authorAvatar}
                            authorId={authorId}
                            bids={bids}
                            isAuction={isAuction}
                            USD_price={USD_price}
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </>
            ) : (
              nfts.map((nft) => {
                const {
                  artId,
                  name,
                  price,
                  img,
                  asset,
                  author,
                  authorAvatar,
                  authorId,
                  bids,
                  isAuction,
                  USD_price,
                } = nft;
                return (
                  <Link key={nft.id} to="/" className={cx(styles.drop, styles.dropDouble)}>
                    <ArtCard
                      artId={artId}
                      name={name}
                      price={price}
                      imageMain={img}
                      asset={asset}
                      author={author}
                      authorAvatar={authorAvatar}
                      authorId={authorId}
                      bids={bids}
                      isAuction={isAuction}
                      USD_price={USD_price}
                    />
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          <Text size="xl" align="center">
            There are no trending nfts yet
          </Text>
        )}
      </div>
    </div>
  );
};

export default Trending;
