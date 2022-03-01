import { Text } from 'components';
import { TSingleCollection } from 'pages/CreateNFT/container';
import { useState, VFC } from 'react';

interface ICollections {
  initCollections: TSingleCollection[];
  setCollections: (collections: TSingleCollection[]) => void;
  onRefresh?: () => void;
}

const Collections: VFC<ICollections> = ({ initCollections, setCollection }) => {
  const [collections, setCollections] = useState(initCollections);
  return (
    <section>
      <div>
        <Text tag="h4">Add collection</Text>
      </div>
    </section>
  );
};
