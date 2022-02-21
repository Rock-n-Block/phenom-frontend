import { FC, useCallback, useEffect, useState } from 'react';

import cx from 'classnames';

import { Logo } from 'components';
import { useWindowSize } from 'hooks';

import { HeaderLinks, Search, User } from './components';

import styles from './styles.module.scss';

const Headers: FC = () => {
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);

  const handleSetIsOpen = useCallback((value: boolean) => {
    setIsOpen(value);
  }, []);

  useEffect(() => {
    setIsOpen(width > 768);
  }, [width]);
  return (
    <>
      <header className={styles.header}>
        {width > 768 ? (
          <>
            <Logo className={styles.headerLogo} />
            <Search
              isOpen={isOpen}
              handleSetIsOpen={handleSetIsOpen}
              width={width}
              className={styles.searchDesktop}
            />
          </>
        ) : (
          <>
            <Search
              isOpen={isOpen}
              handleSetIsOpen={handleSetIsOpen}
              width={width}
              className={cx(styles.searchDesktop, { [styles.open]: isOpen })}
            />
            {isOpen ? <></> : <Logo className={styles.headerLogo} />}
          </>
        )}
        <HeaderLinks className={styles.headerLinks} />
        <User isDesktop={width > 768} />
      </header>
    </>
  );
};

export default Headers;
