import { TSingleCollection } from "types";

export const CategoryOptions = [
  { id: 1, category: '1' },
  { id: 2, category: '2' },
  { id: 3, category: '3' },
];

export const SubCategoryOptions = [
  { id: 1, category: 's1' },
  { id: 2, category: 's2' },
  { id: 3, category: 's3' },
];

export const CollectionsList: TSingleCollection[] = [
  {
    id: 1,
    name: 'Collection name',
    price: '22.3',
    currency: 'PHETA',
    icon: './mockCollection1.png',
  },
  {
    id: 2,
    name: 'Collection name',
    price: '22.3',
    currency: 'PHETA',
    icon: './mockCollection2.png',
  },
  {
    id: 3,
    name: 'Collection name',
    price: '22.3',
    currency: 'PHETA',
    icon: './mockCollection3.png',
  },
];
