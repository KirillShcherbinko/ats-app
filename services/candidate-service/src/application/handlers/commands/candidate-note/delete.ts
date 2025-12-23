import { ICommandHandler } from "../../../../shared/application/command-handler";
import { DeleteCandidateNoteCommand } from "../../../commands/candidate-note/delete";
import { CandidateService } from "../../../services/candidate";

export class DeleteCandidateNoteHandler
  implements ICommandHandler<DeleteCandidateNoteCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: DeleteCandidateNoteCommand): Promise<void> {
    await this.candidateService.deleteNote(command.payload);
  }
}
