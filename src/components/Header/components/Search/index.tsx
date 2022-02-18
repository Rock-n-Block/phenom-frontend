/* eslint-disable react/no-array-index-key */
import { useCallback, useState, VFC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

import cx from 'classnames';

import { H5, TextInput } from 'components';

// import Loader from 'components/Loader';
// import { useFetchNft } from 'hooks';
// import { INft } from 'typings';
import { SearchTag } from './components';

import { routes } from 'appConstants';

import img from './mockImg.png';

import { iconSearch } from 'assets/img';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  classNameDropdown?: string;
  isDesktop?: boolean;
};

const Search: VFC<Props> = ({ isDesktop = true, className, classNameDropdown }) => {
  const [inputValue, setInputValue] = useState('');
  // TODO: check if pagination needed, if not delete
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchResultPage, setSearchResultPage] = useState(1);

  const isLoading = false;
  const nftCards: any = [
    { id: 0, media: img, name: 'Ba' },
    { id: 0, media: img, name: 'Bananas' },
    { id: 0, media: img, name: 'Bali' },
    { id: 0, media: img, name: 'Bar' },
    { id: 0, media: img, name: 'Basketball' },
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

  return (
    <div className={cx(styles.search, { [styles.desktop]: isDesktop }, className)}>
      <OutsideClickHandler onOutsideClick={clearInput}>
        <TextInput
          onChange={handleInput}
          value={inputValue}
          placeholder="NFT Name, username"
          // type="text"
          className={styles.searchInput}
          icon={iconSearch}
        />
        {isLoading && <></>}
        <div
          className={cx(
            styles.searchDropdown,
            { [styles.isVisible]: isShowResults || isNoResults },
            classNameDropdown,
          )}
        >
          {isShowResults && (
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
          {isNoResults && <H5>No search results</H5>}
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Search;
