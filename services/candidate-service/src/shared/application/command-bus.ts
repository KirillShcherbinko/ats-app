import { ICommand } from "./command";
import { ICommandHandler } from "./command-handler";

export type CommandHandlerConstructor<T extends ICommand> = new (
  ...args: unknown[]
) => ICommandHandler<T>;

export class CommandBus {
  private handlers = new Map<string, ICommandHandler<ICommand>>();

  register<T extends ICommand>(
    commandType: string,
    handler: ICommandHandler<T>
  ): void {
    this.handlers.set(commandType, handler as ICommandHandler<ICommand>);
  }

  async execute<T extends ICommand>(command: T): Promise<string | void> {
    const handler = this.handlers.get(command.commandType);

    if (!handler) {
      throw new Error(
        `No handler registered for command: ${command.commandType}`
      );
    }

    return handler.execute(command);
  }
}
