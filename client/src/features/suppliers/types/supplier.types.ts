export interface ISupplier {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateSupplier {
  title: string;
}

export interface IUpdateSupplier {
  title: string;
}

export interface ICreatedSupplierInfo {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}
