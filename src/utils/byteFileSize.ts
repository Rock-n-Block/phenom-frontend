/* eslint-disable no-return-assign */
/* eslint-disable no-confusing-arrow */
import { maxSizeUnit, TMaxSize } from 'appConstants';

const byteFileSize = (maxSize: TMaxSize): number => {
  const { unit, size } = maxSize;
  const units = maxSizeUnit;
  const unitIdx = units.findIndex((u) => u === unit);
  return units.slice(0, unitIdx).reduce((a, _, i) => (i === 0 ? a * 8 : a * 1024), size);
};

export default byteFileSize;
