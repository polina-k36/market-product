export interface IShopData {
  id: number;
  city: string;
  street: string;
  house: string;
  phone: string;
}

export interface ICreateShop {
  city: string;
  street: string;
  house: string;
  phone: string;
}

export interface IUpdateShop {
  city?: string;
  street?: string;
  house?: string;
  phone?: string;
}
