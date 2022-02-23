import { maxSizeUnit, TMaxSize } from 'appConstants';

const formatBytes = (bytes: number, decimals = 2): TMaxSize => {
  if (bytes === 0)
    return {
      size: 0,
      unit: 'b',
    };

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = maxSizeUnit;

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    size: parseFloat((bytes / k ** i).toFixed(dm)),
    unit: sizes[i],
  };
};

export default formatBytes;
