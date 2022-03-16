import BigNumber from 'bignumber.js';

import { formatNumber } from './numberFormatter';

export const getTokenAmount = (
  balance: string | number,
  decimals = 18,
  shouldForamateNumber = false,
): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).multipliedBy(new BigNumber(10).pow(decimals));

  if (shouldForamateNumber) {
    const formattedValue = formatNumber(+displayValue.toString());

    return formattedValue;
  }

  return displayValue.toString(10);
};

export const getTokenAmountDisplay = (
  balance: string | number,
  decimals = 18,
): string => {
  if (balance === '') {
    return '0';
  }

  if (typeof balance === 'number') {
    balance.toString();
  }

  const displayValue = new BigNumber(balance).dividedBy(new BigNumber(10).pow(decimals));

  return parseFloat(displayValue.toFixed(4)).toString();
};
