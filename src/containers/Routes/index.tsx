import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// import { useMst } from 'store';
import { GuardRoute, Page } from 'containers';
import { useLanguage } from 'context';

// import { GuardedRoute } from 'components';
// import { observer } from 'mobx-react-lite';
import {
  Collection,
  Create,
  CreateNFT,
  EditProfile,
  Explore,
  // Activity,
  // CollectionPage,
  // ComingSoon,
  // ConnectWallet,
  // CreateToken,
  // Discover,
  Home,
  NFTCard,
  NotFoundPage,
  Profile,
  // LostPage404,
  // Nft,
  // Profile,
  // ProfileEdit,
  // UploadVariants,
  // TopNfts,
  // CreateCollection,
} from 'pages';
import { CreateCollection } from 'pages/CreateCollection';

import { routes } from 'appConstants';

const RoutesPage = () => {
  const { loadNamespaces } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (pathname === routes.home.root) {
      loadNamespaces('Home');
    }
    if (pathname.includes(routes.create.root)) {
      loadNamespaces('Create');
    }
    if (pathname.includes(routes.explore.root)) {
      loadNamespaces('Explore');
    }
  }, [loadNamespaces, pathname]);
  return (
    <Routes>
      {/* <Route
        path={routes.discover.root}
        render={() => <Page needFooter={false} component={<Discover />} />}
      />
      <Route exact path={routes.profile.edit} render={() => <Page component={<ProfileEdit />} />} />
      <Route path={routes.profile.root} render={() => <Page component={<Profile />} />} /> */}
      <Route
        path="*"
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<NotFoundPage />}
          />
        }
      />

      <Route
        path={routes.home.root}
        element={<Page classes={['with-left-detail', 'with-right-detail']} component={<Home />} />}
      />
      <Route
        path={routes.create.root}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<Create />}
            />
          </GuardRoute>
        }
      />
      <Route
        path={routes.create.single}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<CreateNFT type="Single" />}
            />
          </GuardRoute>
        }
      />
      <Route
        path={routes.create.multiple}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<CreateNFT type="Multiple" />}
            />
          </GuardRoute>
        }
      />
      <Route
        path={routes.create.collection('single')}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<CreateCollection type="single" />}
            />
          </GuardRoute>
        }
      />
      <Route
        path={routes.create.collection('multiple')}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<CreateCollection type="multiple" />}
            />
          </GuardRoute>
        }
      />
      <Route
        path={routes.explore.root}
        element={
          <Page classes={['with-left-detail', 'with-right-detail']} component={<Explore />} />
        }
      />
      <Route
        path={routes.nft.root}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<NFTCard />}
          />
        }
      />
      <Route
        path={routes.collection.root}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<Collection />}
          />
        }
      />
      <Route
        path={`${routes.profile.root}/*`}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<Profile />}
          />
        }
      />
      <Route
        path={routes.profile.edit}
        element={
          <GuardRoute require={['logged']}>
            <Page
              classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
              component={<EditProfile />}
            />
          </GuardRoute>
        }
      />
      {/* <Route exact path={routes.activity.root} render={() => <Page component={<Activity />} />} />
      <Route
        path={routes.collection.root}
        render={() => <Page needFooter={false} component={<CollectionPage />} />}
      />
      <Route
        path={routes.connectWallet.root}
        render={() => <Page component={<ConnectWallet />} />}
      />
      <Route path={routes.topNfts.root} render={() => <Page component={<TopNfts />} />} />
      <Route path={routes.lostPage.root} render={() => <Page component={<LostPage404 />} />} />
      <Route path={routes.comingSoon.root} render={() => <Page component={<ComingSoon />} />} />
      {/* GUARDED ROUTES */}
      {/* <GuardedRoute
        auth={user.isAuth}
        path={routes.create.single}
        render={() => <Page component={<CreateToken />} />}
      />
      <GuardedRoute
        auth={user.isAuth}
        path={routes.create.collection.multiple}
        render={() => <Page component={<CreateCollection isMultiple />} />}
      />
      <GuardedRoute
        auth={user.isAuth}
        path={routes.create.multiple}
        render={() => <Page component={<CreateToken isMultiple />} />}
      />
      <Route
        path={routes.create.collection.single}
        render={() => <Page component={<CreateCollection />} />}
      />
      <GuardedRoute
        auth={!!user.address}
        path={routes.create.root}
        render={() => <Page component={<UploadVariants />} />}
      /> */}
      {/* GUARDED ROUTES */}
      {/* <Route path='*' element={routes.lostPage.root} /> */}
    </Routes>
  );
};

export default RoutesPage;
