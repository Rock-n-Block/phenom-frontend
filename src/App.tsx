import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { RoutesPage } from 'containers';

import { Header } from 'components';

export const App: FC = () => {
  const { ready } = useTranslation();
  if (!ready) {
    return <div>Loading</div>;
  }
  return (
    <>
      <ToastContainer limit={3} pauseOnFocusLoss={false} />
      <Header />
      <RoutesPage />
    </>
  );
};
