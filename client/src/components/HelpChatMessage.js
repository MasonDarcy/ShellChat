import React from "react";
import { v4 } from "uuid";

function HelpChatMessage({ commands, helpEventName, keys }) {
  console.log(`Help event key: ${helpEventName}`);
  switch (helpEventName) {
    case keys.BASIC_HELP_KEY:
      return (
        <div className="help">
          Type <span className="command">/help</span>{" "}
          <span className="option">-a</span> or{" "}
          <span className="command">/help</span>{" "}
          <span className="argument">commandName</span> (argument) to list all
          commands or get information about a specific command.
        </div>
      );
    case keys.PRINT_ALL_COMMANDS_KEY:
      return (
        <div className="help">
          {commands.map((command) => {
            return (
              <div key={v4()}>
                <pre>
                  Command name: <span className="command">{command._name}</span>
                  <br />
                  <span className="helpDescription">Description:</span>{" "}
                  {command._description}
                  <br />
                  {command._args.map((arg) => {
                    return (
                      <div key={v4()}>
                        Arguments: <span className="argument">{arg._name}</span>{" "}
                        -- {arg.description}
                      </div>
                    );
                  })}
                  {command.options.map((arg) => {
                    return (
                      <div key={v4()}>
                        <span className="helpDescription">Options:</span>{" "}
                        <span className="option">{arg.flags}</span> --{" "}
                        {arg.description}
                      </div>
                    );
                  })}
                </pre>
              </div>
            );
          })}
        </div>
      );
    case keys.PRINT_ONE_COMMAND_KEY:
    default:
      return null;
  }
}

export default HelpChatMessage;
