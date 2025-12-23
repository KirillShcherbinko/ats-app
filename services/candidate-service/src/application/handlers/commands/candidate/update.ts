import { ICommandHandler } from "../../../../shared/application/command-handler";
import { UpdateCandidateCommand } from "../../../commands/candidate/update";
import { CandidateService } from "../../../services/candidate";

export class UpdateCandidateHandler
  implements ICommandHandler<UpdateCandidateCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: UpdateCandidateCommand): Promise<void> {
    await this.candidateService.updateCandidate(command.payload);
  }
}
