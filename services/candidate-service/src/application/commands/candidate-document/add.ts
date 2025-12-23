import { Command } from "../../../shared/application/command";

export interface AddCandidateDocumentCommandPayload {
  candidateId: string;
  fileUrl: string;
}

export class AddCandidateDocumentCommand extends Command<AddCandidateDocumentCommandPayload> {
  readonly commandType = "AddCandidateDocumentCommand";

  constructor(payload: AddCandidateDocumentCommandPayload) {
    super(payload);
  }
}
