// src/application/handlers/commands/delete-candidate.handler.ts
import { ICommandHandler } from "../../../../shared/application/command-handler";
import { DeleteCandidateCommand } from "../../../commands/candidate/delete";
import { CandidateService } from "../../../services/candidate";

export class DeleteCandidateHandler
  implements ICommandHandler<DeleteCandidateCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: DeleteCandidateCommand): Promise<void> {
    await this.candidateService.deleteCandidate(command.payload);
  }
}
