import type { IAuthUser, IUserRole } from '@/types/auth/auth.types';

export interface IAuthResponse {
  success: true;
  accessToken: string;
  data: IAuthUser;
}

export interface IFullUserInfo {
  id: number;
  name: string;
  phone: string | null;
  email: string | null;
  emailVerified: boolean;
  birthDate: Date | null;
  isBanned: boolean;
  role: IUserRole;
  addresses: IUserAddress[];
  cards: IUserCard[];
}

export interface IUserCard {
  id: number;
  cardLast4: string;
  cardBrand: string;
}
export interface IUserAddress {
  id: number;
  street: string;
  house: string;
  city: string;
  apartment?: string;
}

export interface ILoginProps {
  login: string;
  password: string;
}

export interface IRegisterProps {
  name: string;
  login: string;
  password: string;
}
