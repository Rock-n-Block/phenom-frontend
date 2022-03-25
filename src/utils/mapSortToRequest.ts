import { TSort } from 'types';

const sortMap = {
  price: 'price',
  date: 'created_at',
} as const;

export const mapSortToRequest = (sort: TSort | null): string => {
  return sort && sort.field
    ? `${sort.dir === 'desc' ? '-' : ''}${sortMap[sort.field as keyof typeof sortMap]}`
    : '';
};
