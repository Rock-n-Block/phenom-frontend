import { useMemo, VFC } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import cn from 'classnames';

import { Avatar, Button, Clipboard, TabBar, Text } from 'components';

import { CollectionsList } from 'pages/CreateNFT/mock/mock';

import { routes } from 'appConstants';
import { TBarOption } from 'types';

import { nftCards, profile } from './mock';
import { AboutMe, Collections, Preview } from './Tabs';

import { iconEdit } from 'assets/img';

import styles from './styles.module.scss';

const Profile: VFC = () => {
  const { userId } = useParams();

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
        value: '/bidded',
        name: 'Bidded',
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
          [styles['owner-page']]: +userId === profile.id,
        })}
      >
        <Avatar
          id={userId}
          className={styles['profile-page__wrapper-info__avatar']}
          avatar={profile.avatarURL}
          size={144}
        />
        <Text
          tag="h3"
          color="dark"
          weight="medium"
          className={styles['profile-page__wrapper-info__name']}
        >
          {profile.name}
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
          {profile.balance} {profile.currency}
        </Text>
        <Clipboard
          className={styles['profile-page__wrapper-info__address']}
          value={profile.address}
        />
        {+userId === profile.id && (
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
            element={<AboutMe socials={profile.socials} description={profile.description} />}
          />
          <Route path="owned" element={<Preview key="owned" cardsData={nftCards} />} />
          <Route path="for-sale" element={<Preview key="for-sale" cardsData={nftCards} />} />
          <Route path="sold" element={<Preview key="sold" cardsData={nftCards} />} />
          <Route path="bidded" element={<Preview key="bidded" cardsData={nftCards} />} />
          <Route
            path="favorites"
            element={<Preview key="favorites" withAuction cardsData={nftCards} />}
          />
          <Route
            path="collections"
            element={<Collections key="collections" cardsData={CollectionsList} />}
          />
        </Routes>
      </div>
    </section>
  );
};

export default Profile;
