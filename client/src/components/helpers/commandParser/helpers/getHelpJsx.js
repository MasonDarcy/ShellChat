//Return a simple JSX representation of all the commands and some of their attributes.
import { v4 } from "uuid";
export const getBasicHelp = () => {
  return (
    <div className="help">
      Type <span className="command">/help</span>{" "}
      <span className="option">-a</span> or{" "}
      <span className="command">/help</span>{" "}
      <span className="argument">commandName</span> (argument) to list all
      commands or get information about a specific command.
    </div>
  );
};

export const getAllHelp = (commands) => {
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
                    Arguments: <span className="argument">{arg._name}</span> --{" "}
                    {arg.description}
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
};
