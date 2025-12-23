import { Query } from "../../../shared/application/query";
import { IListNotesFilter } from "../../types";

export interface GetCandidateNotesQueryPayload extends IListNotesFilter {
  candidateId: string;
  page: number;
  limit: number;
}

export class GetCandidateNotesQuery extends Query<GetCandidateNotesQueryPayload> {
  readonly queryType = "GetCandidateNotesQuery";

  constructor(payload: GetCandidateNotesQueryPayload) {
    super(payload);
  }
}
