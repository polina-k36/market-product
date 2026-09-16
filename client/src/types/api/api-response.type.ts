export interface IResponse<T> {
  success: true;
  data: T;
}

export interface IPaginationResponse<T> {
  success: true;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}
