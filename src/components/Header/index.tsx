import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Logo, Text, TextInput } from 'components';

import { User } from './components';

import { iconSearch } from 'assets/img';

import styles from './styles.module.scss';

const navLinks = [
  { title: 'Explore', url: '/explore' },
  { title: 'Create', url: '/create' },
  { title: '0x76F2a6e3...Cb92d63b5', url: '/' },
];

const Headers: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <Logo />
        <TextInput placeholder="NFT Name, username" icon={iconSearch} />
        <div className={styles.headerLinks}>
          {navLinks.map(({ url, title }) => (
            <Link to={url} className={styles.link} key={title}>
              <Text color="black" weight='bold' >{title}</Text>
            </Link>
          ))}
        </div>
        <User />
      </header>
    </>
  );
};

export default Headers;
