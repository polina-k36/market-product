export interface IAuthUser {
  id: number;
  role: IUserRole;
  isBanned: boolean;
}

export type UserRoles = 'CLIENT' | 'ADMIN';
export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

export interface IUserRole {
  id: number;
  title: UserRoles;
}

export interface IAuthState {
  accessToken: string | null;
  user: IAuthUser | null;
  status: AuthStatus;

  setAccessToken: (accessToken: string | null) => void;
  setAuthStatus: (status: AuthStatus) => void;
  setUser: (user: IAuthUser | null) => void;
  clearAuth: () => void;
}
