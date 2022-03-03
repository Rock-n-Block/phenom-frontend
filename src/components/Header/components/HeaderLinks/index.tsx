import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import cx from 'classnames';
import { Popover } from 'containers';

import { Button, Text } from 'components';

import { routes } from 'appConstants';
import { usePopover, useWindowSize } from 'hooks';

import styles from './styles.module.scss';

interface IHeaderLinksProps {
  toggleMenu?: () => void;
  className?: string;
}

interface ITag {
  title?: string;
  label?: string;
  link?: string;
}

interface IHeaderNestedBodyProps {
  isLinks?: boolean;
  links?: ITag[];
  onClick: (url: string) => void;
}

const tags = [
  { title: 'All categories', label: 'All categories', link: '/' },
  { title: 'Rooms', label: 'Rooms', link: '/' },
  { title: 'Area', label: 'Area', link: '/' },
  { title: 'Buildings', label: 'Buildings', link: '/' },
  { title: 'Skins', label: 'Skins', link: '/' },
];

const HeaderNestedBody: FC<IHeaderNestedBodyProps> = ({ isLinks = false, links, onClick }) => {
  const { closePopover } = usePopover();
  const handleTagClick = (title: string) => {
    closePopover();
    onClick(routes.explore.filter(title));
  };

  if (isLinks && links) {
    return (
      <>
        {links?.length !== 0 &&
          links?.map(({ label, link }) => (
            <Link className={styles.dropdownLink} key={label} to={link as string}>
              <Text color="black" size="xl" weight="semibold">
                {label}
              </Text>
            </Link>
          ))}
      </>
    );
  }
  return (
    <>
      {links?.length !== 0 &&
        links?.map((tag) => (
          <Button
            className={styles.dropdownLink}
            key={tag.title}
            color="transparent"
            onClick={() => handleTagClick(tag.title as string)}
          >
            <Text color="black" size="m" weight="bold" className={styles.linktext}>
              {tag.title}
            </Text>
          </Button>
        ))}
    </>
  );
};

const HeaderLinks: FC<IHeaderLinksProps> = ({ className, toggleMenu }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const location = useLocation();

  const nav = useMemo(
    () => [
      {
        title: 'Explore',
        active: location.pathname.includes(routes.explore.root),
        disabled: false,
        isNested: width > 768,
        internalLinks: tags,
        url: width < 768 ? routes.explore.root : '',
      },
      {
        url: routes.create.root,
        active: location.pathname.includes(routes.create.root),
        title: 'Create',
        isNested: false,
      },
      { title: '0x76F2a6e3...Cb92d63b5', url: '/', isUnderlined: true },
    ],
    [location.pathname, width],
  );

  const handleMenuItemClick = (url: string) => {
    if (toggleMenu) {
      toggleMenu();
    }
    navigate(url);
  };

  return (
    <div className={cx(styles.headerNavigation, className)}>
      {nav.map(({ url, title, active, disabled, isNested, internalLinks, isUnderlined }) => {
        if (isNested && !disabled) {
          return (
            <Popover position="center" key={title}>
              <Popover.Button className={`${styles.linkBtn} ${active && styles.active}`}>
                <Text
                  className={cx(styles.linkTitle, styles.uppercase)}
                  size="m"
                  weight="bold"
                  color={active ? 'purple' : 'black'}
                >
                  {title}
                </Text>
              </Popover.Button>
              <Popover.Body className={styles.popoverBody}>
                <HeaderNestedBody
                  links={internalLinks}
                  // isLinks={isLinks}
                  onClick={handleMenuItemClick}
                />
              </Popover.Body>
            </Popover>
          );
        }
        if (url && !disabled) {
          return (
            <Button
              padding="0"
              key={title}
              color="transparent"
              onClick={() => handleMenuItemClick(url)}
              className={cx(
                styles.linkBtn,
                { [styles.active]: active },
                { [styles.underline]: isUnderlined },
              )}
            >
              <Text
                weight="bold"
                size="m"
                color={active ? 'purple' : 'black'}
                className={styles.uppercase}
              >
                {title}
              </Text>
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};

export default HeaderLinks;
