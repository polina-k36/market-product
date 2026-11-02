export interface INds {
  id: number;
  rate: number;
  titleRate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateNds {
  rate: number;
  titleRate: string;
}

export interface IUpdateNds {
  rate?: number;
  titleRate?: string;
}
