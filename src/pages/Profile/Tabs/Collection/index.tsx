import { ReactElement, useEffect, useMemo, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { getSelfCollections } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { CollectionCard, NFTList } from 'components';

import { useShallowSelector } from 'hooks';
import { Collection } from 'types';

interface IPreviewProfileCollections {
  cardsData: Collection[];
  skeleton?: ReactElement[];
}

const PreviewProfileCollections: VFC<IPreviewProfileCollections> = ({ cardsData, skeleton }) => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));
  useEffect(() => {
    dispatch(getSelfCollections({ network: chain }));
  }, [chain, dispatch]);
  const elements = useMemo(
    () => cardsData.map((card) => <CollectionCard key={card.url} collection={card} />),
    [cardsData],
  );
  return <NFTList elements={skeleton || elements} />;
};

export default PreviewProfileCollections;
