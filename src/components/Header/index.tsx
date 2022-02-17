import { FC } from 'react';

import { Logo } from 'components';

import { HeaderLinks, Search, User } from './components';

import styles from './styles.module.scss';

const Headers: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo className={styles.headerLogo}/>
        <Search className={styles.searchDesktop} />
        <HeaderLinks className={styles.headerLinks} />
        <User />
      </header>
    </>
  );
};

export default Headers;
