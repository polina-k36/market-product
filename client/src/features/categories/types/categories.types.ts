export interface ICategory {
  id: number;
  title: string;
}

export interface IFullCategory {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUpdateCategory {
  title: string;
}
