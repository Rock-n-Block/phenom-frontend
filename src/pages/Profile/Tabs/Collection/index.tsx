import { ReactElement, useMemo, VFC } from 'react';

import { CollectionCard, NFTList } from 'components';

import { TSingleCollection } from 'types';

interface IPreviewProfileCollections {
  cardsData: TSingleCollection[];
  skeleton?: ReactElement[];
}

const PreviewProfileCollections: VFC<IPreviewProfileCollections> = ({ cardsData, skeleton }) => {
  const elements = useMemo(
    () => cardsData.map((card) => <CollectionCard key={card.id} collection={card} />),
    [cardsData],
  );
  return <NFTList elements={skeleton || elements} />;
};

export default PreviewProfileCollections;
