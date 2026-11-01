export interface IPaymentMethod {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUpdatePaymentMethod {
  title: string;
}
