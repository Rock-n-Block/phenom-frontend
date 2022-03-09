import { validStatuses, errorStatuses } from 'appConstants';

export const validateStatus = (status: number) => (
  [...validStatuses, ...errorStatuses].includes(status)
);
