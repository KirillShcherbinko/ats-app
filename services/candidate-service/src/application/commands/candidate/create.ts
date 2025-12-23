import { Command } from "../../../shared/application/command";

export interface CreateCandidateCommandPayload {
  firstName: string;
  lastName: string;
  patronymic: string | null;
  email: string;
  phone: string | null;
  photoUrl: string | null;
  description: string | null;
}

export class CreateCandidateCommand extends Command<CreateCandidateCommandPayload> {
  readonly commandType = "CreateCandidateCommand";

  constructor(payload: CreateCandidateCommandPayload) {
    super(payload);
  }
}
