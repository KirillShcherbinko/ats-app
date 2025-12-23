import { CandidateDocument } from "../../domain/entities/candidate-document";

export interface CandidateDocumentDTO {
  id: string;
  candidateId: string;
  fileUrl: string;
  uploadedAt: Date;
}

export class CandidateDocumentMapper {
  static toDTO(document: CandidateDocument): CandidateDocumentDTO {
    return {
      id: document.id.toString(),
      candidateId: document.candidateId.toString(),
      fileUrl: document.fileUrl.value,
      uploadedAt: document.uploadedAt,
    };
  }

  static toDTOList(documents: CandidateDocument[]): CandidateDocumentDTO[] {
    return documents.map((document) => this.toDTO(document));
  }
}
