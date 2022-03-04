import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// import { useMst } from 'store';
import { Page } from 'containers';
import { useLanguage } from 'context';

// import { GuardedRoute } from 'components';
// import { observer } from 'mobx-react-lite';
import {
  Create,
  CreateNFT,
  Explore,
  // Activity,
  // CollectionPage,
  // ComingSoon,
  // ConnectWallet,
  // CreateToken,
  // Discover,
  Home,
  NFTCard,
  // LostPage404,
  // Nft,
  // Profile,
  // ProfileEdit,
  // UploadVariants,
  // TopNfts,
  // CreateCollection,
} from 'pages';

import { routes } from 'appConstants';
import { CreateCollection } from 'pages/CreateCollection';

const RoutesPage = () => {
  const { loadNamespaces } = useLanguage();
  const { pathname } = useLocation();

  useEffect(() => {
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
        path={routes.home.root}
        element={<Page classes={['with-left-detail', 'with-right-detail']} component={<Home />} />}
      />
      <Route
        path={routes.create.root}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<Create />}
          />
        }
      />
      <Route
        path={routes.create.single}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<CreateNFT type="Single" />}
          />
        }
      />
      <Route
        path={routes.create.multiple}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<CreateNFT type="Multiple" />}
          />
        }
      />
      <Route
        path={routes.create.collection}
        element={
          <Page
            classes={['gradient-body-2', 'with-left-detail', 'with-right-detail']}
            component={<CreateCollection />}
          />
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
