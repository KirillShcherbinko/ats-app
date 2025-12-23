import { Query } from "../../../shared/application/query";
import { IListCandidatesFilter } from "../../types";

export interface ListCandidatesQueryPayload extends IListCandidatesFilter {
  candidateIds: string[];
  page: number;
  limit: number;
}

export class ListCandidatesQuery extends Query<ListCandidatesQueryPayload> {
  readonly queryType = "ListCandidatesQuery";

  constructor(payload: ListCandidatesQueryPayload) {
    super(payload);
  }
}
