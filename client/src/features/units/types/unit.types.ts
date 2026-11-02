export interface IUnit {
  id: number;
  shortTitle: string;
  fullTitle: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUnit {
  shortTitle: string;
  fullTitle: string;
}

export interface IUpdateUnit {
  shortTitle?: string;
  fullTitle?: string;
}
