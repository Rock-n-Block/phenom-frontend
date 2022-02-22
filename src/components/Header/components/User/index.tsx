/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import { Popover } from 'containers';
import mock from 'mock';

import { Button, H4, Text } from 'components';
import { sliceString } from 'utils';

import { usePopover } from 'hooks';

import { CrossIcon, iconArrowDown, iconCopy, iconCreate, iconEdit, iconExit } from 'assets/img';

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
          <Text>{sliceString(user.address, 28, 0)}</Text>
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

const UserMobile: FC<{ user: any }> = ({ user }) => {
  const dropdownOptions = useMemo(
    () => [
      {
        title: 'Explore',
      },
      {
        title: 'All NFT',
        url: '/',
      },
      {
        title: 'Rooms',
        url: '/',
      },
      {
        title: ' Area',
        url: '/',
      },
      {
        title: 'Buildings',
        url: '/',
      },
      {
        title: 'Skins',
        url: '/',
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
      <div className={cx(styles.address, styles.itemMobile)}>
        <Text>{sliceString(user.address, 28, 0)}</Text>
        <img src={iconCopy} alt="copy" className={styles.copy} />
      </div>
      <div className={cx(styles.dropdown, { [styles.active]: isLinksOpen })}>
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          className={cx(styles.dropdownHead, styles.itemMobile)}
          onClick={() => setIsLinksOpen(!isLinksOpen)}
        >
          <>
            <Text className={styles.text} tag="span">
              {dropdownOptions[0].title}
            </Text>
            <img alt="arrow" className={styles.arrow} src={iconArrowDown} />
          </>
        </div>

        <div className={styles.dropdownBody}>
          {dropdownOptions.map((option: any, index: number) => {
            return index !== 0 ? (
              <div
                onKeyDown={() => {}}
                tabIndex={0}
                role="button"
                className={styles.option}
                // onClick={() => handleClick(option.symbol.toUpperCase())}
                key={`dropdown_option_${option.title}`}
              >
                <Text className={styles.text} tag="span">
                  {option.title}
                </Text>
              </div>
            ) : (
              <></>
            );
          })}
        </div>
      </div>
      <div className={styles.userButtons}>
        <div className={styles.userItem}>
          <div className={styles.avatar}>
            <img src={mock.user} alt="avatar" />
            <Text>Username</Text>
          </div>
          <div className={styles.balance}>
            <Text color="blue">0.00 PHETA</Text>
          </div>
        </div>
        <div className={styles.userItem}>
          <div className={styles.createWrapper}>
            <div className={styles.imageWrapper}>
              <img src={iconCreate} alt="" className={styles.create} />
            </div>
            <Text>Create</Text>
          </div>
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
        <UserMobile user={{ id: 0, address: '0xc78CD789D1483189C919A8d4dd22004CFD867Eb4' }} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
