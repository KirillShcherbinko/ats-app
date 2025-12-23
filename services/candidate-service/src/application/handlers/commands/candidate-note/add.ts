// src/application/handlers/commands/add-candidate-note.handler.ts
import { ICommandHandler } from "../../../../shared/application/command-handler";
import { AddCandidateNoteCommand } from "../../../commands/candidate-note/add";
import { CandidateService } from "../../../services/candidate";

export class AddCandidateNoteHandler
  implements ICommandHandler<AddCandidateNoteCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: AddCandidateNoteCommand): Promise<string> {
    return this.candidateService.addNote(command.payload);
  }
}
