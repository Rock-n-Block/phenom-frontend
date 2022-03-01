interface ICreateValidator {
  name: { min: number; max: number };
  description: { min: number; max: number };
}

export const createValidator: ICreateValidator = {
  name: { min: 2, max: 50 },
  description: { min: 0, max: 500 },
};
