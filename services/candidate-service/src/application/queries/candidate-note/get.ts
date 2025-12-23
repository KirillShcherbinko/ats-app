import { Query } from "../../../shared/application/query";

export interface GetCandidateNoteQueryPayload {
  noteId: string;
}

export class GetCandidateNoteQuery extends Query<GetCandidateNoteQueryPayload> {
  readonly queryType = "GetCandidateNoteQuery";

  constructor(payload: GetCandidateNoteQueryPayload) {
    super(payload);
  }
}
