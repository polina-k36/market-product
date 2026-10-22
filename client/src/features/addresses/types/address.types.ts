export interface IAddress {
  id: number;
  city: string;
  street: string;
  house: string;
  apartment: string | null;
  comment: string | null;
}

export interface ICreateUpdateAddress {
  city: string;
  street: string;
  house: string;
  apartment: string | null;
  comment: string | null;
}
