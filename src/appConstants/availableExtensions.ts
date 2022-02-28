export const audioFormats = ['mp3', 'ogg', 'wav'] as const;
export const threeDFormats = ['glb', 'glf'] as const;
export const imagesFormats = ['png', 'gif', 'webp', 'jpeg', 'jpg', 'svg'] as const;
export const videosFormats = ['mp4'] as const;

export type TFilesGroup = 'audio' | 'threeD' | 'image' | 'video';

export const availableExtensions = [
  ...audioFormats,
  ...threeDFormats,
  ...imagesFormats,
  ...videosFormats,
] as const;
export type TAvailableExtensions = typeof availableExtensions[number];

export const maxSizeUnit = ['bits', 'bytes', 'Kb', 'Mb', 'Gb'] as const;
export type TMaxSizeUnit = typeof maxSizeUnit[number];

export type TMaxSize = {
  size: number;
  unit: TMaxSizeUnit;
};

export const maxSize: TMaxSize = {
  size: 15,
  unit: 'Mb',
};

export const getFileGroup = (extension: TAvailableExtensions): TFilesGroup | null => {
  if (audioFormats.includes(extension as any)) {
    return 'audio';
  }
  if (videosFormats.includes(extension as any)) {
    return 'video';
  }
  if (imagesFormats.includes(extension as any)) {
    return 'image';
  }
  if (threeDFormats.includes(extension as any)) {
    return 'threeD';
  }
  return null;
};

export const getExtension = (filePath: string) => {
  return filePath.slice(filePath.lastIndexOf('.') + 1);
};
