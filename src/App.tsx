import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { getCategories } from 'store/nfts/actions';

import { RoutesPage } from 'containers';

import { Header } from 'components';

import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const dispatch = useDispatch();

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  const { ready } = useTranslation();
  if (!ready) {
    return <div>Loading</div>;
  }
  return (
    <>
      <ToastContainer
        limit={3}
        pauseOnFocusLoss={false}
        autoClose={4000}
        hideProgressBar
        position="top-right"
        closeButton={false}
      />
      <Header />
      <RoutesPage />
    </>
  );
};
