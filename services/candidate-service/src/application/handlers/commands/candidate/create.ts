import { ICommandHandler } from "../../../../shared/application/command-handler";
import { CreateCandidateCommand } from "../../../commands/candidate/create";
import { CandidateService } from "../../../services/candidate";

export class CreateCandidateHandler
  implements ICommandHandler<CreateCandidateCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: CreateCandidateCommand): Promise<string> {
    return this.candidateService.createCandidate(command.payload);
  }
}
