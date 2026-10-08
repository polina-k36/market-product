import type { IAddress } from '@/features/addresses/types/address.types';
import type { IUserCard } from '@/features/cards/types/card.types';
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
  addresses: IAddress[];
  cards: IUserCard[];
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
