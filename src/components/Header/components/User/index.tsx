/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import { Popover } from 'containers';
import mock from 'mock';

import { Avatar, Button, Clipboard, H4, Text } from 'components';

import { routes } from 'appConstants';
import { usePopover } from 'hooks';

import { CrossIcon, iconArrowDownBlue, iconCreate, iconEdit, iconExit } from 'assets/img';

import styles from './User.module.scss';

interface IUserProps {
  className?: string;
  isDesktop: boolean;
}

const UserBody: FC<{ user: any }> = ({ user }) => {
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
          <Link to={routes.profile.link(mock.id, 'about-me')} className={styles.avatar}>
            <img src={mock.user} alt="avatar" />
            <Text>Username</Text>
          </Link>
          <Link to={routes.profile.edit} className={styles.edit}>
            <img src={iconEdit} alt="edit" />
            <Text>EDIT</Text>
          </Link>
        </div>
        <div className={styles.balance}>
          <Text color="blue">0.00 PHETA</Text>
        </div>
        <div className={styles.address}>
          <Clipboard value={user.address} />
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

const UserMobile: FC<{ user: any; close: any }> = ({ user, close }) => {
  const dropdownOptions = useMemo(
    () => [
      {
        title: 'All categories',
        url: routes.explore.filter('all categories'),
      },
      {
        title: 'Rooms',
        url: routes.explore.filter('rooms'),
      },
      {
        title: ' Area',
        url: routes.explore.filter('area'),
      },
      {
        title: 'Buildings',
        url: routes.explore.filter('buildings'),
      },
      {
        title: 'Skins',
        url: routes.explore.filter('skins'),
      },
    ],
    [],
  );

  const [isLinksOpen, setIsLinksOpen] = useState(false);

  return (
    <div className={styles.mobileBody}>
      <div className={styles.title}>
        <H4 align="center" weight="bold">
          Menu
        </H4>
      </div>
      <Clipboard theme="gray" value={user.address} />
      <div className={cx(styles.dropdown, { [styles.active]: isLinksOpen })}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cx(styles.dropdownHead, styles.itemMobile)}
          onClick={() => setIsLinksOpen(!isLinksOpen)}
        >
          <>
            <Text className={styles.text} tag="span" weight="bold">
              Explore
            </Text>
            <img alt="arrow" className={styles.arrow} src={iconArrowDownBlue} />
          </>
        </div>

        <div className={styles.dropdownBody}>
          {dropdownOptions.map((option: any, index: number) => {
            return option.url !== '' ? (
              <div className={cx(styles.option, { [styles.borderTop]: index === 0 })} key={index}>
                <Link to={`${option.url}`} onClick={() => close()} replace>
                  <Text className={styles.text} tag="span">
                    {option.title}
                  </Text>
                </Link>
              </div>
            ) : (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={cx(styles.option, { [styles.borderTop]: index === 0 })}
                // onClick={() => handleClick(option.symbol.toUpperCase())}
                key={`dropdown_option_${option.title}`}
              >
                <Text className={styles.text} tag="span">
                  {option.title}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.userButtons}>
        <div className={styles.userItem}>
          <div className={styles.avatar}>
            <Avatar id={mock.id} avatar={mock.user} />
            <Text>username</Text>
          </div>
          <div className={styles.balance}>
            <Text color="blue">0.00 PHETA</Text>
          </div>
        </div>
        <div className={styles.userItem}>
          <Link to={routes.create.root} className={styles.createWrapper}>
            <div className={styles.imageWrapper}>
              <img src={iconCreate} alt="" className={styles.create} />
            </div>
            <Text>Create</Text>
          </Link>
        </div>
      </div>
      <Button color="transparent" className={cx(styles.itemMobile, styles.exit)}>
        <Text className={styles.text} tag="span">
          Exit
        </Text>
        <img src={iconExit} alt="exit" className={styles.exitIcon} />
      </Button>

      <div className={styles.foot}>
        <Text className={styles.footPhenom}>PhenomMetaverse©{new Date().getFullYear()}</Text>
        <Link to="/">
          <Button padding="0" color="transparent">
            <Text color="blue" className={styles.docs}>
              Documents
            </Text>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const User: FC<IUserProps> = ({ className, isDesktop }) => {
  const [isBodyOpen, setIsBodyOpen] = useState(false);

  const handleOpenBody = useCallback((value: boolean) => {
    setIsBodyOpen(value);
  }, []);

  return isDesktop ? (
    <Popover className={cx(styles.user, className)}>
      <Popover.Button className={styles.popoverBtn}>
        <img src={mock.user} alt="Avatar" />
      </Popover.Button>
      <Popover.Body className={styles.popoverBody}>
        <UserBody user={{ id: 0, address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4' }} />
      </Popover.Body>
    </Popover>
  ) : (
    <div className={cx(styles.user, className)}>
      <Button
        color="transparent"
        className={styles.userBtn}
        onClick={() => handleOpenBody(!isBodyOpen)}
      >
        {isBodyOpen ? <CrossIcon /> : <img src={mock.user} alt="Avatar" />}
      </Button>
      {isBodyOpen ? (
        <UserMobile
          user={{ id: 0, address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4' }}
          close={() => setIsBodyOpen(false)}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
