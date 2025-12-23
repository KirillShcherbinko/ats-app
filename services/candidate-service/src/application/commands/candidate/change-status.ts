import { Command } from "../../../shared/application/command";

export interface ChangeCandidateStatusCommandPayload {
  candidateId: string;
  status: string;
  reason?: string;
}

export class ChangeCandidateStatusCommand extends Command<ChangeCandidateStatusCommandPayload> {
  readonly commandType = "ChangeCandidateStatusCommand";

  constructor(payload: ChangeCandidateStatusCommandPayload) {
    super(payload);
  }
}
