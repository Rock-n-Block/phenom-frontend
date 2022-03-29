/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getTrending } from 'store/nfts/actions';
import { clearTrending } from 'store/nfts/reducer';
import nftsSelector from 'store/nfts/selectors';

import cx from 'classnames';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

import { ArtCard, H2, Text } from 'components';

import { TitleDropdown } from './components';

import { DEFAULT_CURRENCY } from 'appConstants';
import { useShallowSelector, useWindowSize } from 'hooks';
import { Category, CategoryName } from 'types';

import 'swiper/swiper.less';

import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import styles from './styles.module.scss';

type Props = {
  className?: string;
};
const Trending: FC<Props> = ({ className }) => {
  const categories = useShallowSelector(nftsSelector.getProp('categories'));
  const nfts = useShallowSelector(nftsSelector.getProp('trending'));
  const dispatch = useDispatch();
  const { t } = useTranslation('Home');
  const [title, setTitle] = useState<any>({ name: CategoryName.allCategories, id: 0 });
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
    dispatch(
      getTrending(
        title.name !== CategoryName.allCategories
          ? {
              category: title?.id,
            }
          : {},
      ),
    );
  }, [dispatch, title]);

  useEffect(() => {
    fetchTrendingNfts();
  }, [fetchTrendingNfts]);

  useEffect(
    () => () => {
      dispatch(clearTrending());
    },
    [dispatch],
  );
  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.notableDrops, className)}>
        <H2 weight="semibold" className={styles.title} align="center">
          {t('Trending.TrendingIn')}{' '}
          {categories?.length && (
            <TitleDropdown
              value={title}
              setValue={setTitle}
              options={[
                { name: CategoryName.allCategories, id: 0 },
                ...categories.map((category: Category) => ({
                  id: category.id || 0,
                  name: category.name || '',
                })),
              ]}
            />
          )}
        </H2>
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
                      id,
                      name,
                      price,
                      highestBid,
                      minimalBid,
                      media,
                      currency,
                      creator,
                      bids,
                      isAucSelling,
                      usdPrice,
                      highestBidUsd,
                      minimalBidUsd,
                      likeCount,
                      isLiked,
                      available,
                    } = nft;
                    return (
                      <SwiperSlide key={id}>
                        <Link to="/" className={styles.drop}>
                          <ArtCard
                            artId={id || 0}
                            inStockNumber={available}
                            name={name}
                            price={price || highestBid?.amount || minimalBid}
                            imageMain={media || ''}
                            asset={currency?.symbol || DEFAULT_CURRENCY}
                            author={creator?.name || ''}
                            authorAvatar={creator?.avatar || ''}
                            authorId={creator?.id || 0}
                            bids={bids}
                            isAuction={isAucSelling}
                            USD_price={usdPrice || highestBidUsd || minimalBidUsd || 0}
                            likesNumber={likeCount}
                            isLiked={isLiked}
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
                  id,
                  name,
                  price,
                  highestBid,
                  minimalBid,
                  media,
                  currency,
                  creator,
                  bids,
                  isAucSelling,
                  usdPrice,
                  highestBidUsd,
                  minimalBidUsd,
                  likeCount,
                  isLiked,
                  available,
                } = nft;
                return (
                  <Link key={id} to="/" className={cx(styles.drop, styles.dropDouble)}>
                    <ArtCard
                      artId={id || 0}
                      inStockNumber={available}
                      name={name}
                      price={price || highestBid?.amount || minimalBid}
                      imageMain={media || ''}
                      asset={currency?.symbol || DEFAULT_CURRENCY}
                      author={creator?.name || ''}
                      authorAvatar={creator?.avatar || ''}
                      authorId={creator?.id || 0}
                      bids={bids}
                      isAuction={isAucSelling}
                      USD_price={usdPrice || highestBidUsd || minimalBidUsd || 0}
                      likesNumber={likeCount}
                      isLiked={isLiked}
                    />
                  </Link>
                );
              })
            )}
          </div>
        ) : (
          <div className={styles.noItems}>
            <Text size="xl" align="center">
              There is no trending tokens in this category
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
