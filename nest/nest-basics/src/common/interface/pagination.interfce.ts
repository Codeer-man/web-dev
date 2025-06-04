export class PaginationMeta {
  currentPage: number;
  itemPerPage: number;
  totalPage: number;
  totalitem: number;
  hasPreviousPage: boolean;
  hadNextPage: boolean;
}

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationMeta;
}
