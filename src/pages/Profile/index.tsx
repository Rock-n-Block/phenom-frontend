import { useEffect, useMemo, VFC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import collectionsSelector from 'store/collections/selectors';
import nftSelector from 'store/nfts/selectors';
import { getProfileById } from 'store/profile/actions';
import profileSelector from 'store/profile/selectors';
import userSelector from 'store/user/selectors';

import cn from 'classnames';
import { useWalletConnectContext } from 'context';

import { ArtCardSkeleton, Avatar, Button, Clipboard, TabBar, Text } from 'components';
import { generateUsername } from 'utils';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { TBarOption } from 'types';

import { profile } from './mock';
import { AboutMe, Collections, Preview } from './Tabs';

import { iconEdit } from 'assets/img';

import styles from './styles.module.scss';

const Profile: VFC = () => {
  const { userId } = useParams();
  const id = useShallowSelector(userSelector.getProp('id'));
  const nfts = useShallowSelector(nftSelector.getProp('nfts'));
  const totalPages = useShallowSelector(nftSelector.getProp('totalPages'));
  const { walletService } = useWalletConnectContext();
  const { avatar, balance, displayName, address, bio, instagram, twitter, site, email } =
    useShallowSelector(profileSelector.getProfile);

  const { collections, totalPages: totalCollections } = useShallowSelector(
    collectionsSelector.getCollections,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getProfileById({ id: userId, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, userId, walletService]);

  const NFTsCardsSkeleton = useMemo(
    // eslint-disable-next-line react/no-array-index-key
    () => new Array(6).fill(0).map((_, k) => <ArtCardSkeleton key={k} />),
    [],
  );

  const Tabs = useMemo<TBarOption[]>(
    () => [
      {
        value: '/about-me',
        name: 'About me',
      },
      {
        value: '/owned',
        name: 'Owned',
      },
      {
        value: '/for-sale',
        name: 'For sale',
      },
      {
        value: '/sold',
        name: 'Sold',
      },
      {
        value: '/bided',
        name: 'Bided',
      },
      {
        value: '/favorites',
        name: 'Favorites',
      },
      {
        value: '/collections',
        name: 'Collections',
      },
    ],
    [],
  );

  if (!userId) {
    return <div>404</div>;
  }

  return (
    <section className={cn(styles['profile-page__wrapper'])}>
      <div className={styles['profile-page__wrapper__detail']} />
      <div
        className={cn(styles['profile-page__wrapper-info'], {
          [styles['owner-page']]: userId === String(id),
        })}
      >
        <Avatar
          id={userId}
          className={styles['profile-page__wrapper-info__avatar']}
          avatar={avatar || ''}
          size={144}
        />
        <Text
          tag="h3"
          color="dark"
          weight="medium"
          className={styles['profile-page__wrapper-info__name']}
        >
          {displayName || generateUsername(id)}
        </Text>
        <Text className={styles['profile-page__wrapper-info__balance']} color="lightGray" size="s">
          Balance
        </Text>
        <Text
          className={styles['profile-page__wrapper-info__balance-amount']}
          color="blue"
          size="xxl"
          weight="medium"
        >
          {balance} {profile.currency}
        </Text>
        <Clipboard
          className={styles['profile-page__wrapper-info__address']}
          value={address || ''}
        />
        {userId === String(id) && (
          <Button
            className={styles['profile-page__wrapper-info__edit']}
            color="light"
            icon={iconEdit}
            href={routes.profile.edit}
            padding="small"
          >
            <Text color="dark" weight="medium" size="s">
              Edit
            </Text>
          </Button>
        )}
      </div>
      <div className={cn(styles['profile-page__wrapper-tab-bar'])}>
        <TabBar
          options={Tabs}
          tabClassName={styles['tab-width']}
          rootPath={routes.profile.root.replace(':userId', userId)}
        />
      </div>
      <div className={cn(styles['profile-page__wrapper-content'])}>
        <Routes>
          <Route
            path="about-me"
            element={
              <AboutMe
                name={displayName || generateUsername(id)}
                socials={{ instagram, twitter, site, email }}
                description={bio || ''}
              />
            }
          />
          <Route
            path="owned"
            element={
              <Preview
                key="owned"
                fetchName="owned"
                id={userId}
                pages={totalPages}
                cardsData={nfts}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
          <Route
            path="for-sale"
            element={
              <Preview
                id={userId}
                pages={totalPages}
                key="for-sale"
                fetchName="forSale"
                withAuction
                cardsData={nfts}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
          <Route
            path="sold"
            element={
              <Preview
                key="sold"
                id={userId}
                pages={totalPages}
                fetchName="sold"
                cardsData={nfts}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
          <Route
            path="bided"
            element={
              <Preview
                key="bided"
                fetchName="bided"
                id={userId}
                pages={totalPages}
                cardsData={nfts}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Preview
                key="favorites"
                id={userId}
                pages={totalPages}
                fetchName="favorites"
                withAuction
                cardsData={nfts}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
          <Route
            path="collections"
            element={
              <Collections
                id={userId}
                pages={totalCollections}
                key="collections"
                cardsData={collections}
                skeleton={NFTsCardsSkeleton}
              />
            }
          />
        </Routes>
      </div>
    </section>
  );
};

export default Profile;
