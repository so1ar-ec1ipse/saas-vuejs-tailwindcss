export interface FilterRequest {
  sortBy: string;
  isSortAscending: boolean;
  page: number;
  pageSize: number;
  search: string;
}
