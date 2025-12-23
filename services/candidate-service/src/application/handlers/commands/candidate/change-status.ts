// src/application/handlers/commands/change-candidate-status.handler.ts
import { ICommandHandler } from "../../../../shared/application/command-handler";
import { ChangeCandidateStatusCommand } from "../../../commands/candidate/change-status";
import { CandidateService } from "../../../services/candidate";

export class ChangeCandidateStatusHandler
  implements ICommandHandler<ChangeCandidateStatusCommand>
{
  constructor(private readonly candidateService: CandidateService) {}

  async execute(command: ChangeCandidateStatusCommand): Promise<void> {
    await this.candidateService.changeCandidateStatus(command.payload);
  }
}
