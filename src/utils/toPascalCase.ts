const toPascalCase = (str: string): string =>
  str
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('');

export default toPascalCase;
