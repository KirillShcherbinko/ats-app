import { IQueryHandler } from "../../../../shared/application/query-handler";
import { CandidateQueryService } from "../../../services/query";
import { CandidateDTO } from "../../../dtos/candidate";
import { GetCandidateQuery } from "../../../queries/candidate/get";

export class GetCandidateHandler
  implements IQueryHandler<GetCandidateQuery, CandidateDTO>
{
  constructor(private readonly queryService: CandidateQueryService) {}

  async execute(query: GetCandidateQuery): Promise<CandidateDTO> {
    return this.queryService.getCandidate(query.payload.candidateId);
  }
}
