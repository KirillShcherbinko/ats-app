import { Command } from "../../../shared/application/command";

export interface UpdateCandidateCommandPayload {
  candidateId: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string | null;
  email?: string;
  phone?: string | null;
  photoUrl?: string | null;
  description?: string | null;
}

export class UpdateCandidateCommand extends Command<UpdateCandidateCommandPayload> {
  readonly commandType = "UpdateCandidateCommand";

  constructor(payload: UpdateCandidateCommandPayload) {
    super(payload);
  }
}
