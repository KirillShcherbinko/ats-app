import { Entity } from "../../shared/domain/entity";
import { UniqueId } from "../../shared/kernel/unique-id";
import { FileUrl } from "../value-objects/file-url";
import { ICandidateDocumentProps } from "./types";

export class CandidateDocument extends Entity<ICandidateDocumentProps> {
  constructor(props: ICandidateDocumentProps, id?: UniqueId) {
    super(props, id);
  }

  static create(candidateId: UniqueId, fileUrl: string): CandidateDocument {
    return new CandidateDocument({
      candidateId,
      fileUrl: FileUrl.create(fileUrl),
      uploadedAt: new Date(),
    });
  }

  get candidateId(): UniqueId {
    return this.props.candidateId;
  }

  get fileUrl(): FileUrl {
    return this.props.fileUrl;
  }

  get uploadedAt(): Date {
    return this.props.uploadedAt;
  }
}
