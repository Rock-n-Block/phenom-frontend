export const availableExtensions = [
  'png',
  'gif',
  'webp',
  'mp4',
  'jpeg',
  'jpg',
  'svg',
  'webm',
  'wav',
  'ogg',
  'glb',
  'glf',
  'mp3',
] as const;
export type TAvailableExtensions = typeof availableExtensions[number];

export const maxSizeUnit = ['bits', 'bytes', 'Kb', 'Mb', 'Gb'] as const;
export type TMaxSizeUnit = typeof maxSizeUnit[number];

export type TMaxSize = {
  size: number;
  unit: TMaxSizeUnit;
};

export const maxSize: TMaxSize = {
  size: 5,
  unit: 'Mb',
};
