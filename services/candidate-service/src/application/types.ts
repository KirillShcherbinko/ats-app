export interface IPaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IListCandidatesFilter {
  status?: string;
  search?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
}

export interface IListNotesFilter {
  authorId?: string;
  createdAtFrom?: Date;
  createdAtTo?: Date;
}
