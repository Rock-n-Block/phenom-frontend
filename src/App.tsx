import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { RoutesPage } from 'containers';

import { Header } from 'components';

export const App: FC = () => {
  return (
    <>
      <ToastContainer limit={3} pauseOnFocusLoss={false} />
      <Header />
      <RoutesPage />
    </>
  );
};
