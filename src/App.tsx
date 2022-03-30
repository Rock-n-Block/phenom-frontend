import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { getCategories } from 'store/nfts/actions';
import { getRates } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { Modals, RoutesPage } from 'containers';

import { Header } from 'components';

import { useShallowSelector } from 'hooks';

import 'react-toastify/dist/ReactToastify.css';

export const App: FC = () => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));

  const handleGetCategories = useCallback(() => {
    dispatch(getCategories({}));
  }, [dispatch]);

  useEffect(() => {
    handleGetCategories();
  }, [handleGetCategories]);

  useEffect(() => {
    dispatch(getRates({ network: chain }));
    const timeintervalId = setInterval(() => {
      dispatch(getRates({ network: chain }));
    }, 60000);

    return () => {
      clearTimeout(timeintervalId);
    };
  }, [chain, dispatch]);

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
      <Modals />
      <RoutesPage />
    </>
  );
};
