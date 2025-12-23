import { Command } from "../../../shared/application/command";

export interface AddCandidateNoteCommandPayload {
  candidateId: string;
  authorId: string;
  content: string;
}

export class AddCandidateNoteCommand extends Command<AddCandidateNoteCommandPayload> {
  readonly commandType = "AddCandidateNoteCommand";

  constructor(payload: AddCandidateNoteCommandPayload) {
    super(payload);
  }
}
