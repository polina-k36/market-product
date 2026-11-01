export interface IDeliveryMethod {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUpdateDeliveryMethod {
  title: string;
}
