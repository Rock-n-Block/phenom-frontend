const standards = {
  single: 'ERC721',
  multiple: 'ERC1155',
};

export const getStandard = (standard: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return standards[standard.toLowerCase()];
};
