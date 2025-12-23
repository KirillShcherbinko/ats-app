import { ICommand } from "./command";

export interface ICommandHandler<T extends ICommand> {
  execute(command: T): Promise<string | void>;
}
