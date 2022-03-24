import { TNullable } from 'types';
import { Collection, TrendingCollection } from 'types/api';

export type CollectionsState = {
  collections: Collection[];
  trendingCollections: TrendingCollection[];
  topCollections: Collection[];
  totalPages: number;
  singleCollection: TNullable<Collection>;
};
