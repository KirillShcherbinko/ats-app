import { Query } from "../../../shared/application/query";

export interface GetCandidateDocumentsQueryPayload {
  candidateId: string;
}

export class GetCandidateDocumentsQuery extends Query<GetCandidateDocumentsQueryPayload> {
  readonly queryType = "GetCandidateDocumentsQuery";

  constructor(payload: GetCandidateDocumentsQueryPayload) {
    super(payload);
  }
}
