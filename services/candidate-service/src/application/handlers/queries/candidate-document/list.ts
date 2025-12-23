// src/application/handlers/queries/get-candidate-documents.handler.ts
import { IQueryHandler } from "../../../../shared/application/query-handler";
import { CandidateQueryService } from "../../../services/query";
import { CandidateDocumentDTO } from "../../../dtos/candidate-document";
import { GetCandidateDocumentsQuery } from "../../../queries/candidate-document/list";

export class GetCandidateDocumentsHandler
  implements IQueryHandler<GetCandidateDocumentsQuery, CandidateDocumentDTO[]>
{
  constructor(private readonly queryService: CandidateQueryService) {}

  async execute(
    query: GetCandidateDocumentsQuery
  ): Promise<CandidateDocumentDTO[]> {
    return this.queryService.getCandidateDocuments(query.payload.candidateId);
  }
}
