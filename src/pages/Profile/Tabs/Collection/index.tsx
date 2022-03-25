import { ReactElement, useCallback, useEffect, useMemo, useState, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { searchCollections } from 'store/collections/actions';
import collectionsActionsTypes from 'store/collections/actionTypes';
import uiSelector from 'store/ui/selectors';
import userSelector from 'store/user/selectors';

import { CollectionCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { Collection, RequestStatus } from 'types';

interface IPreviewProfileCollections {
  cardsData: Collection[];
  skeleton?: ReactElement[];
  id: number | string;
  pages: number;
}

const PreviewProfileCollections: VFC<IPreviewProfileCollections> = ({
  cardsData,
  skeleton = [],
  id,
  pages,
}) => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));
  const { [collectionsActionsTypes.SEARCH_COLLECTIONS]: fetchingCollections } = useShallowSelector(
    uiSelector.getUI,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCollections = useCallback(
    (page: number, shouldConcat = false) => {
      dispatch(
        searchCollections({
          requestData: { type: 'collections', page, owner: id, creator: id },
          shouldConcat,
        }),
      );
    },
    [dispatch, id],
  );

  useEffect(() => {
    setCurrentPage(1);
    fetchCollections(1);
  }, [chain, dispatch, fetchCollections]);

  const onLoadMoreClick = useCallback(
    (page: number | number) => {
      fetchCollections(page, true);
      setCurrentPage(page);
    },
    [fetchCollections],
  );

  const elements = useMemo(
    () => cardsData.map((card) => <CollectionCard key={card.url} collection={card} />),
    [cardsData],
  );

  return (
    <NFTList
      elements={fetchingCollections === RequestStatus.REQUEST ? skeleton : elements}
      isLoading={fetchingCollections === RequestStatus.REQUEST}
      currentPage={currentPage}
      pages={pages}
      onLoadMore={onLoadMoreClick}
    />
  );
};

export default PreviewProfileCollections;
