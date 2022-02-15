/* eslint-disable react/no-array-index-key */
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { Popover } from 'containers';

import { Text } from 'components';

import { usePopover } from 'hooks';

import avatar from './mockAvatar.png';

import styles from './User.module.scss';

interface IUserProps {
  className?: string;
}

const UserBody: FC<{ user: any }> = ({ user }) => {
  if (!user.id) {
    console.log('');
  }
  const dropdownOptions = useMemo(
    () => [
      {
        title: 'Public profile',
        url: '/',
      },
      {
        title: 'My collections',
        url: '/',
      },
      {
        title: 'Favorites',
        url: '/',
      },
      {
        title: 'Settings',
        url: '/',
      },
      {
        title: 'Disconnect',
        url: '',
      },
    ],
    [],
  );

  const { closePopover } = usePopover();
  return (
    <ul className={styles.menu}>
      {dropdownOptions.map((option, index) => {
        if (option.url?.startsWith('http')) {
          return (
            <a className={styles.item} href={option.url} rel="noopener noreferrer" key={index}>
              <div className={styles.text}>{option.title}</div>
            </a>
          );
        }
        return option.url !== '' ? (
          <Link
            className={styles.item}
            to={`${option.url}`}
            onClick={() => closePopover()}
            key={index}
            replace
          >
            <Text className={styles.text} weight="medium" size="m">
              {option.title}
            </Text>
          </Link>
        ) : (
          <div
            tabIndex={0}
            className={styles.item}
            key={index}
            onClick={() => {}}
            role="button"
            onKeyDown={() => {}}
          >
            <Text className={styles.text} weight="medium" size="m">
              {option.title}
            </Text>
          </div>
        );
      })}
    </ul>
  );
};

const User: FC<IUserProps> = ({ className }) => {
  return (
    <Popover className={cn(styles.user, className)}>
      <Popover.Button className={styles.popoverBtn}>
        <img src={avatar} alt="Avatar" />
      </Popover.Button>
      <Popover.Body className={styles.popoverBody}>
        <UserBody user={{ id: 0 }} />
      </Popover.Body>
    </Popover>
  );
};

export default User;
