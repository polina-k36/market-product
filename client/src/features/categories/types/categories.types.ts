export interface Category {
  id: number;
  title: string;
}

export interface CategoriesResponse {
  success: true;
  data: Category[];
}
