/* eslint-disable react/no-array-index-key */
import { FC, useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import userSelector from 'store/user/selectors';

import cx from 'classnames';
import { Popover } from 'containers';
import { useWalletConnectContext } from 'context';
import mock from 'mock';

import { Avatar, Button, Clipboard, H4, Text } from 'components';

import { routes } from 'appConstants';
import { usePopover, useShallowSelector } from 'hooks';
import { CategoryName, Chains, State, UserState, WalletProviders } from 'types';

import {
  ArrowConnectSVG,
  iconArrowDownBlue,
  iconCreate,
  iconEdit,
  iconExit,
  WalletConnectSVG,
} from 'assets/img';

import styles from './User.module.scss';

interface IUserProps {
  className?: string;
  isDesktop: boolean;
}

const UserBody: FC<{ user: any; disconnect: () => void }> = ({ user, disconnect }) => {
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
        url: '',
        icon: iconExit,
        onClick: disconnect,
      },
    ],
    [disconnect],
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
              onClick={option.onClick}
              role="button"
              onKeyDown={option.onClick}
            >
              <Text className={styles.text} weight="bold" size="m" align="center">
                {option.title}
              </Text>
            </div>
          );
        })}
      </ul>
    </>
  );
};

const UserMobile: FC<{ user: any; close: any; disconnect: () => void; isOpen: boolean }> = ({
  user,
  close,
  disconnect,
  isOpen,
}) => {
  const location = useLocation();

  const dropdownOptions = useMemo(
    () => [
      {
        title: 'All categories',
        url: routes.explore.filter(CategoryName.allCategories),
      },
      {
        title: 'Rooms',
        url: routes.explore.filter(CategoryName.rooms),
      },
      {
        title: 'Area',
        url: routes.explore.filter(CategoryName.area),
      },
      {
        title: 'Buildings',
        url: routes.explore.filter(CategoryName.buildings),
      },
      {
        title: 'Skins',
        url: routes.explore.filter(CategoryName.skins),
      },
    ],
    [],
  );

  const [isLinksOpen, setIsLinksOpen] = useState(false);

  useEffect(() => {
    return isOpen ? () => close() : null;
  }, [close, isOpen, location.pathname]);

  return (
    <div className={styles.mobileBody}>
      <div className={styles.title}>
        <H4 align="center" weight="bold">
          Menu
        </H4>
      </div>
      <Clipboard theme="gray" value={user.address} className={styles.address} />
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
      <Button
        color="transparent"
        className={cx(styles.itemMobile, styles.exit)}
        onClick={disconnect}
      >
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

interface IBurger {
  isOpen: boolean;
}

const Burger: VFC<IBurger> = ({ isOpen }) => {
  return (
    <div className={cx(styles.burger, { [styles.open]: isOpen })}>
      <span className={styles.line1} />
      <span className={styles.line2} />
    </div>
  );
};

interface IConnectSection {
  connect: (provider: WalletProviders, chain: Chains) => void;
}

const ConnectSection: VFC<IConnectSection> = ({ connect }) => {
  const onClickHandler = useCallback(() => {
    connect(WalletProviders.metamask, Chains.bsc);
  }, [connect]);
  return (
    <div className={styles.connectSection}>
      <div className={styles.connectSectionDesktop}>
        <Button color="outline" onClick={onClickHandler} type="button">
          <Text color="inherit" weight="medium" className={styles.connectText}>
            Connect to metamask
          </Text>
        </Button>
      </div>
      <div className={styles.connectSectionMobile}>
        <Button color="light" onClick={onClickHandler}>
          <WalletConnectSVG />
        </Button>
        <div className={styles.connectSectionMobileMotion}>
          <Text color="gray" weight="medium" size="xs" className={styles.connectText}>
            Connect to metamask
          </Text>
          <ArrowConnectSVG className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

const User: FC<IUserProps> = ({ className, isDesktop }) => {
  const [isBodyOpen, setIsBodyOpen] = useState(false);
  const { address, id } = useShallowSelector<State, UserState>(userSelector.getUser);
  const { connect, disconnect } = useWalletConnectContext();

  const handleOpenBody = useCallback((value: boolean) => {
    setIsBodyOpen(value);
  }, []);

  const onConnectClick = useCallback(
    (provider: WalletProviders, chain: Chains) => {
      connect(provider, chain);
    },
    [connect],
  );
  if (!address && !id) {
    return <ConnectSection connect={onConnectClick} />;
  }
  return isDesktop ? (
    <Popover className={cx(styles.user, className)}>
      <Popover.Button className={styles.popoverBtn}>
        <img src={mock.user} alt="Avatar" />
      </Popover.Button>
      <Popover.Body className={styles.popoverBody}>
        <UserBody user={{ id, address }} disconnect={disconnect} />
      </Popover.Body>
    </Popover>
  ) : (
    <div className={cx(styles.user, className)}>
      <Button
        color="transparent"
        className={styles.userBtn}
        onClick={() => handleOpenBody(!isBodyOpen)}
      >
        <Burger isOpen={isBodyOpen} />
      </Button>
      {isBodyOpen ? (
        <UserMobile
          user={{ id, address }}
          close={() => setIsBodyOpen(false)}
          disconnect={disconnect}
          isOpen={isBodyOpen}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default User;
