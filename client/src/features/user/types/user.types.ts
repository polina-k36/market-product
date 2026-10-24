export interface IUpdateUser {
  name: string | null;
  phone: string | null;
  email: string | null;
}

export interface IUpdatedUserRes {
  email: string;
}

export interface IFullInfoUser {
  addressesCount: number;
  cardsCount: number;
  ordersCount: number;
  role: {
    id: number;
    title: string;
  };
  name: string;
  phone: string | null;
  email: string | null;
  emailVerified: boolean;
  passwordHash: string | null;
  birthDate: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  isBanned: boolean;
  bannedAt: Date | null;
  banReason: string | null;
  id: number;
}
