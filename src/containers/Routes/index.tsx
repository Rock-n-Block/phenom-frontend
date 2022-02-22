import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// import { useMst } from 'store';
import { Page } from 'containers';
import { useLanguage } from 'context';

// import { GuardedRoute } from 'components';
// import { observer } from 'mobx-react-lite';
import {
  // Activity,
  // CollectionPage,
  // ComingSoon,
  // ConnectWallet,
  // CreateToken,
  // Discover,
  Home,
  // LostPage404,
  // Nft,
  // Profile,
  // ProfileEdit,
  // UploadVariants,
  // TopNfts,
  // CreateCollection,
} from 'pages';

import { routes } from 'appConstants';

const RoutesPage = () => {
  const { loadNamespaces } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/': {
        loadNamespaces('Home');
        break;
      }
      case '/create': {
        loadNamespaces('Create');
        break;
      }
      default:
        break;
    }
  }, [loadNamespaces, location.pathname]);
  return (
    <Routes>
      {/* <Route path={routes.nft.root}>
        <Page component={<Nft />} />{' '}
      </Route>
      <Route
        path={routes.discover.root}
        render={() => <Page needFooter={false} component={<Discover />} />}
      />
      <Route exact path={routes.profile.edit} render={() => <Page component={<ProfileEdit />} />} />
      <Route path={routes.profile.root} render={() => <Page component={<Profile />} />} /> */}

      <Route path={routes.home.root} element={<Page component={<Home />} />} />
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
