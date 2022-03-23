/* eslint-disable react/no-array-index-key */
import { useCallback, useMemo, useRef, useState, VFC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { presearchNfts } from 'store/nfts/actions';
import nftSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';

import cx from 'classnames';
import { debounce } from 'lodash';

import { Button, H5, TextInput } from 'components';

import { SearchTag } from './components';

import { DEBOUNCE_DELAY_100, routes } from 'appConstants';
import { useShallowSelector } from 'hooks';

import { iconSearch } from 'assets/img';

import styles from './styles.module.scss';
import actionTypes from 'store/nfts/actionTypes';
import { RequestStatus } from 'types';
import Loader from 'components/Loader';

type Props = {
  className?: string;
  classNameDropdown?: string;
  isOpen: boolean;
  handleSetIsOpen: (value: boolean) => void;
  width: number;
};

const Search: VFC<Props> = ({ className, classNameDropdown, isOpen, handleSetIsOpen, width }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const nfts = useShallowSelector(nftSelector.getProp('presearchedNfts'));
  const { [actionTypes.PRESEARCH_NFTS]: nftsRequestStatus } = useShallowSelector(uiSelector.getUI);
  const isLoading = useMemo(() => nftsRequestStatus === RequestStatus.REQUEST, [nftsRequestStatus]);
  const totalItems = nfts.length;

  const fetchSearchedNfts = useCallback(
    (text: string) => {
      const requestData: any = {
        type: 'items',
        text,
        page: 1,
      };
      dispatch(presearchNfts({ requestData }));
    },
    [dispatch],
  );

  const newDebouncedFetchSearchedNfts = useRef(
    debounce(fetchSearchedNfts, DEBOUNCE_DELAY_100),
  ).current;

  const handleSearch = useCallback(
    (event) => {
      const newSearchValue = event.target.value;
      setInputValue(newSearchValue);
      newDebouncedFetchSearchedNfts(newSearchValue);
    },
    [newDebouncedFetchSearchedNfts],
  );

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
          onChange={handleSearch}
          value={inputValue}
          placeholder="NFT Name, username"
          // type="text"
          className={cx(styles.searchInput, { [styles.closed]: !isOpen })}
          icon={width > 768 ? iconSearch : iconBtn}
          isButton={width < 768 && isOpen}
          onButtonClick={() => handleSetIsOpen(false)}
        />
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
                {isLoading ? (
                  <Loader size='medium' />
                ) : (
                  nfts.slice(0, 5).map((nft: any, index: number) => {
                    const { media, name, id } = nft;
                    return (
                      <li className={styles.searchItem} key={`${nft?.creator}-${nft?.name}`}>
                        <Link
                          to={routes.nft.link(id)}
                          onClick={() => setInputValue('')}
                          key={index}
                        >
                          <SearchTag image={media} title={name} />
                        </Link>
                      </li>
                    );
                  })
                )}
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
