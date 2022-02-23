const toPascalCase = (str: string, keyPrefix = ''): string =>
  `${keyPrefix}.${str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('')}`;

export default toPascalCase;
