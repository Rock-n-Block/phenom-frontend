interface ICreateValidator {
  name: { min: number; max: number };
  description: { min: number; max: number };
  properties: { name: number; type: number };
  quantity: number;
}

export const createValidator: ICreateValidator = {
  name: { min: 2, max: 50 },
  description: { min: 0, max: 500 },
  properties: { name: 1, type: 1 },
  quantity: 1,
};
