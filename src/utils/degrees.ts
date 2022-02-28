export const radians = (deg: number): number => {
  return (deg * Math.PI) / 180;
};

export const degrees = (rad: number): number => {
  return (rad * 180) / Math.PI;
};
