export interface ICreateDataUser {
  name: string;
  password?: string;
  phone?: string;
  email?: string;
  urlAvatar?: string;
  birthDate?: Date;
  emailVerified?: boolean;
}
