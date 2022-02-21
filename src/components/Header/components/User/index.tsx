/* eslint-disable react/no-array-index-key */
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { Popover } from 'containers';
import mock from 'mock'

import { H4, Text } from 'components';
import { sliceString } from 'utils';

import { usePopover } from 'hooks';

import { iconCopy, iconEdit, iconExit } from 'assets/img';

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
        title: 'Owned',
        url: '/',
      },
      {
        title: 'For sale',
        url: '/',
      },
      {
        title: 'Sale',
        url: '/',
      },
      {
        title: ' Favorites',
        url: '/',
      },
      {
        title: 'Bided',
        url: '/',
      },
      {
        title: 'Collections',
        url: '/',
      },
      {
        title: 'Exit',
        url: '/',
        icon: iconExit,
      },
    ],
    [],
  );

  const address = '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4';

  const { closePopover } = usePopover();
  return (
    <>
      <div className={styles.title}>
        <H4 align="center" weight="bold">
          Profile
        </H4>
      </div>
      <div className={styles.head}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={mock.user} alt="avatar" />
            <Text>Username</Text>
          </div>
          <div className={styles.edit}>
            <img src={iconEdit} alt="edit" />
            <Text>EDIT</Text>
          </div>
        </div>
        <div className={styles.balance}>
          <Text color="blue">0.00 PHETA</Text>
        </div>
        <div className={styles.address}>
          <Text>{sliceString(address, 28, 0)}</Text>
          <img src={iconCopy} alt="copy" className={styles.copy} />
        </div>
      </div>
      <ul className={styles.menu}>
        {dropdownOptions.map((option, index) => {
          // if (option.url?.startsWith('http')) {
          //   return (
          //     <a className={styles.item} href={option.url} rel="noopener noreferrer" key={index}>
          //       <div className={styles.text}>{option.title}</div>
          //     </a>
          //   );
          // }
          return option.url !== '' ? (
            <div className={styles.item} key={index}>
              <Link to={`${option.url}`} onClick={() => closePopover()} replace>
                <Text className={styles.text} weight="bold" size="m" align="center">
                  {option.title}
                </Text>
              </Link>
            </div>
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
    </>
  );
};

const User: FC<IUserProps> = ({ className }) => {
  return (
    <Popover className={cn(styles.user, className)}>
      <Popover.Button className={styles.popoverBtn}>
        <img src={mock.user} alt="Avatar" />
      </Popover.Button>
      <Popover.Body className={styles.popoverBody}>
        <UserBody user={{ id: 0 }} />
      </Popover.Body>
    </Popover>
  );
};

export default User;
