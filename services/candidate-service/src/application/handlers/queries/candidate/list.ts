// src/application/handlers/queries/list-candidates.handler.ts
import { IQueryHandler } from "../../../../shared/application/query-handler";
import { CandidateQueryService } from "../../../services/query";
import { CandidateDTO } from "../../../dtos/candidate";
import { ListCandidatesQuery } from "../../../queries/candidate/list";
import { IPaginatedResult } from "../../../types";

export class ListCandidatesHandler
  implements IQueryHandler<ListCandidatesQuery, IPaginatedResult<CandidateDTO>>
{
  constructor(private readonly queryService: CandidateQueryService) {}

  async execute(
    query: ListCandidatesQuery
  ): Promise<IPaginatedResult<CandidateDTO>> {
    return this.queryService.listCandidates(query.payload);
  }
}
