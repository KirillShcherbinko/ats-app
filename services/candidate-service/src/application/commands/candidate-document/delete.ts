import { Command } from "../../../shared/application/command";

export interface DeleteCandidateDocumentCommandPayload {
  documentId: string;
}

export class DeleteCandidateDocumentCommand extends Command<DeleteCandidateDocumentCommandPayload> {
  readonly commandType = "DeleteCandidateDocumentCommand";

  constructor(payload: DeleteCandidateDocumentCommandPayload) {
    super(payload);
  }
}
