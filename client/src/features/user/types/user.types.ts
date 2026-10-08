export interface IUpdateUser {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export interface IUpdatedUserRes {
  email: string;
}
