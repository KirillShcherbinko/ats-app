import { Command } from "../../../shared/application/command";

export interface DeleteCandidateNoteCommandPayload {
  noteId: string;
}

export class DeleteCandidateNoteCommand extends Command<DeleteCandidateNoteCommandPayload> {
  readonly commandType = "DeleteCandidateNoteCommand";

  constructor(payload: DeleteCandidateNoteCommandPayload) {
    super(payload);
  }
}
