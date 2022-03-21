const generateUsername = (id: number | string | null): string => `user${id ?? 0}`;
export default generateUsername;
