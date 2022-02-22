import { VFC } from 'react';
import { Route, Routes } from 'react-router-dom';

import cn from 'classnames';
import { useLanguage } from 'context';

import { routes } from 'appConstants';

import { Create } from './subpages';

import styles from './styles.module.scss';

const createRoutes = routes.create;

const CreatePage: VFC = () => {
  const { isReady } = useLanguage();
  console.log(createRoutes);
  if (!isReady) {
    return <div>Loading</div>;
  }

  return (
    <div className={cn(styles['create-page__wrapper'], { [styles['loading-page']]: !isReady })}>
      <Routes>
        <Route path="" element={<Create />} />
      </Routes>
    </div>
  );
};

export default CreatePage;
