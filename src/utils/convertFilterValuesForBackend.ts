/* eslint-disable dot-notation */
export const FILTER_DIVIDER = '*';

export const convertFilterValuesForBackend = (filters: any) => {
  const filterValues = Object.entries(filters).reduce((acc, [key]) => {
    const [backendLabel, label, filterValue] = key.split(FILTER_DIVIDER);

    if (backendLabel === 'collections') {
      acc['collections'] = acc?.['collections']
        ? [...acc?.['collections'], filterValue]
        : [filterValue];

      return acc;
    }

    if (backendLabel === 'standart') {
      acc['standart'] = acc?.['standart'] ? [...acc?.['standart'], label] : [label];

      return acc;
    }

    if (!label) {
      acc[key] = filters[key];

      return acc;
    }

    acc[backendLabel] = {
      ...acc[backendLabel],
      [label]: acc?.[backendLabel]?.[label]
        ? [...acc?.[backendLabel]?.[label], filterValue]
        : [filterValue],
    };

    return acc;
  }, {} as any);

  return filterValues;
};
