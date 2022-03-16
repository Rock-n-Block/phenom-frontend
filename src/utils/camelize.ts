import { camelCase, isArray, isObject, snakeCase, transform } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelize = (obj: any) =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key.toString());

    acc[camelKey] = isObject(value) ? camelize(value) : value;
  });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const snakeize = (obj: any) =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = isArray(target) ? key : snakeCase(key.toString());

    acc[camelKey] = isObject(value) ? snakeize(value) : value;
  });
