/* eslint-disable react/no-array-index-key */
import { useCallback, useState, VFC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

import cx from 'classnames';
import mock from 'mock';

import { Button, H5, TextInput } from 'components';

// import Loader from 'components/Loader';
// import { useFetchNft } from 'hooks';
// import { INft } from 'typings';
import { SearchTag } from './components';

import { routes } from 'appConstants';

import { iconSearch } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  classNameDropdown?: string;
  isOpen: boolean;
  handleSetIsOpen: (value: boolean) => void;
  width: number;
};

const Search: VFC<Props> = ({ className, classNameDropdown, isOpen, handleSetIsOpen, width }) => {
  const [inputValue, setInputValue] = useState('');
  // TODO: check if pagination needed, if not delete
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResultPage, setSearchResultPage] = useState(1);

  const isLoading = false;
  const nftCards: any = [
    { id: 0, media: mock.search, name: 'Ba' },
    { id: 0, media: mock.search, name: 'Bananas' },
    { id: 0, media: mock.search, name: 'Bali' },
    { id: 0, media: mock.search, name: 'Bar' },
    { id: 0, media: mock.search, name: 'Basketball' },
  ];
  const totalItems = nftCards.length;

  // const [, totalItems, nftCards, isLoading, debouncedFetch] = useFetchNft(
  //   {
  //     text: inputValue,
  //     page: searchResultPage,
  //     is_verified: 'All',
  //   },
  //   true,
  // );

  const handleInput = useCallback((e) => {
    const { value } = e.target;
    setInputValue(value);
    // debouncedFetch(value);
  }, []);
  const clearInput = () => {
    setInputValue('');
  };

  const isShowResults = totalItems > 0 && inputValue !== '';
  const isNoResults = totalItems === 0 && inputValue !== '' && !isLoading;

  const iconBtn = (
    <Button
      color="transparent"
      className={styles.searchBtn}
      onClick={() => handleSetIsOpen(true)}
      icon={iconSearch}
    />
  );

  return (
    <div className={cx(styles.search, className)}>
      <OutsideClickHandler onOutsideClick={clearInput}>
        <TextInput
          onChange={handleInput}
          value={inputValue}
          placeholder="NFT Name, username"
          // type="text"
          className={cx(styles.searchInput, { [styles.closed]: !isOpen })}
          icon={width > 768 ? iconSearch : iconBtn}
          isButton={width < 768 && isOpen}
          onButtonClick={() => handleSetIsOpen(false)}
        />
        {isLoading && <></>}
        <div
          className={cx(
            styles.searchDropdown,
            { [styles.isVisible]: ((isOpen || width > 768) && isShowResults) || isNoResults },
            classNameDropdown,
          )}
        >
          {isShowResults && (isOpen || width > 768) && (
            <>
              <ul className={styles.searchResults}>
                {nftCards.slice(0, 5).map((nft: any, index: number) => {
                  const { media, name, id } = nft;
                  return (
                    <li className={styles.searchItem} key={`${nft?.creator}-${nft?.name}`}>
                      <Link to={routes.nft.link(id)} onClick={() => setInputValue('')} key={index}>
                        <SearchTag image={media} title={name} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {isNoResults && (isOpen || width > 768) && <H5>No search results</H5>}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
