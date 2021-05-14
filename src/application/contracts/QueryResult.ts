export interface QueryResult<T> {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  from: number;
  to: number;
  items: T[];
}
