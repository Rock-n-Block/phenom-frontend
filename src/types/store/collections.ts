import { IBaseInfo } from 'types';
import { TrendingCollection } from 'types/api';

export type CollectionsState = {
  collections: IBaseInfo[];
  trendingCollections: TrendingCollection[];
  topCollections: IBaseInfo[];
  totalPages: number;
};
