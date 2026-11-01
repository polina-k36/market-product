export interface ISupplier {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSupplier {
  title: string;
}

export interface IUpdateSupplier {
  title: string;
}
