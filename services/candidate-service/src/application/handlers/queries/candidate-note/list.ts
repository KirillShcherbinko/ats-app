// src/application/handlers/queries/get-candidate-notes.handler.ts
import { IQueryHandler } from "../../../../shared/application/query-handler";
import { CandidateQueryService } from "../../../services/query";
import { CandidateNoteDTO } from "../../../dtos/candidate-note";
import { IPaginatedResult } from "../../../types";
import { GetCandidateNotesQuery } from "../../../queries/candidate-note/list";

export class GetCandidateNotesHandler
  implements
    IQueryHandler<GetCandidateNotesQuery, IPaginatedResult<CandidateNoteDTO>>
{
  constructor(private readonly queryService: CandidateQueryService) {}

  async execute(
    query: GetCandidateNotesQuery
  ): Promise<IPaginatedResult<CandidateNoteDTO>> {
    return this.queryService.getCandidateNotes(query.payload);
  }
}
