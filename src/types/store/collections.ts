import { IBaseInfo } from 'types';
import { Collection, TrendingCollection } from 'types/api';

export type CollectionsState = {
  collections: IBaseInfo[];
  trendingCollections: TrendingCollection[];
  topCollections: Collection[];
  totalPages: number;
};
