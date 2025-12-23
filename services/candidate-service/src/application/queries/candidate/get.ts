import { Query } from "../../../shared/application/query";

export interface GetCandidateQueryPayload {
  candidateId: string;
}

export class GetCandidateQuery extends Query<GetCandidateQueryPayload> {
  readonly queryType = "GetCandidateQuery";

  constructor(payload: GetCandidateQueryPayload) {
    super(payload);
  }
}
