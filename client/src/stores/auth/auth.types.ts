export interface IAuthUser {
  id: number;
  email: string | null;
  emailVerified: boolean;
  phone: string | null;
  role: IUserRole;
  isBanned: boolean;
}

export type UserRoles = 'CLIENT' | 'ADMIN';

export interface IUserRole {
  id: number;
  title: UserRoles;
}

export interface IAuthState {
  accessToken: string | null;
  user: IAuthUser | null;

  setAccessToken: (accessToken: string) => void;
  setUser: (user: IAuthUser) => void;
  logout: () => void;
}
