export type UserState = {
  id: number | null;
  avatar: string;
  address: string;
  balance: string | number;
  key: string;
  provider: string;
  displayName: string;
};

export type LoginReq = {
  address: string;
  msg: string;
  signed_msg: string;
};
