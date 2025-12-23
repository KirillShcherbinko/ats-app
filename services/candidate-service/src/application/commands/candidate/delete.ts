import { Command } from "../../../shared/application/command";

export interface DeleteCandidateCommandPayload {
  candidateId: string;
  reason?: string;
}

export class DeleteCandidateCommand extends Command<DeleteCandidateCommandPayload> {
  readonly commandType = "DeleteCandidateCommand";

  constructor(payload: DeleteCandidateCommandPayload) {
    super(payload);
  }
}
