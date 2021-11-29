//Return a simple JSX representation of all the commands and some of their attributes.
import { v4 } from "uuid";
export const getBasicHelp = () => {
  return (
    <div className="help">
      <span className="text-yellow-500">------------------</span> <br />
      Typing <span className="command">help</span>{" "}
      <span className="option">-q</span> will show some{" "}
      <span className="option">quickstart</span> information about what
      shellchat is. <br />
      Typing <span className="command">help</span>{" "}
      <span className="option">-a</span> will print a list of{" "}
      <span className="option">all</span> commands and all of their details.{" "}
      <br />
      <span className="text-red-900">(This list is long)</span>
      <br />
      Typing <span className="command">help</span>{" "}
      <span className="argument">commandName</span> (this is an argument) will
      give more detailed information about the specific command you're
      interested in. <br />
      <span className="text-yellow-500">------------------</span>
    </div>
  );
};

export const getSingleCommandHelp = (command) => {
  return (
    <div className="help">
      <span className="text-yellow-500">------------------</span> <br />
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
            <span className="option">{arg.flags}</span> -- {arg.description}
          </div>
        );
      })}
      <span className="text-yellow-500">------------------</span>
    </div>
  );
};

export const getAllHelp = (commands) => {
  return (
    <div className="help">
      <span className="text-yellow-500">------------------</span> <br />
      Example: <span className="command">commandName</span>{" "}
      <span className="argument">argumentOne argumentTwo</span>{" "}
      <span className="option">-option</span>
      {commands.map((command) => {
        return (
          <div key={v4()}>
            <span className="text-yellow-500">------------------</span> <br />
            <span className="command">{command._name}: </span>
            {command._description}
            <br />
            {command._args.map((arg) => {
              return (
                <div key={v4()}>
                  <span className="argument">{arg._name}</span> --{" "}
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
          </div>
        );
      })}
    </div>
  );
};

export const getQuickStartHelp = () => {
  return (
    <div className="help text-justify">
      <span className="textBreak">----------Basics----------</span> <br />
      <span className="text-purple-500">Shellchat</span> is primarily a chat and
      collaboration application.
      <br />
      <span className="command">Actions</span> are performed by entering text{" "}
      <span className="command">commands</span>, while in{" "}
      <span className="command">command-mode</span>. <br />
      <span className="chat">Chat messages</span> can be sent by toggling into{" "}
      <span className="chat">chat-mode</span> with the{" "}
      <span className="keyHint">down-arrow key</span>. <br />
      <span className="textBreak">----------Example----------</span> <br />
      <span className="argument">Marty2000</span> signs up by entering{" "}
      <span className="command">signup</span>{" "}
      <span className="argument">Marty2000</span>{" "}
      <span className="argument">secretPassword</span> <br />
      This signs up <span className="argument">Marty2000</span> and logs her in,
      and she can execute authorized commands such as{" "}
      <span className="command">join</span>{" "}
      <span className="argument">hangout</span>, connecting her to a channel
      "hangout", where she chats with friends, or performs channel actions like{" "}
      <span className="command">loading</span> a{" "}
      <span className="module">module</span>. <br />
      <span className="textBreak">----------Modules----------</span> <br />
      <span className="module">Modules</span> are{" "}
      <span className="command">loaded</span> channel-based activities, for
      example a collaborative code editor and terminal. Users can write and{" "}
      <span className="command">run</span> code together. Watch out for infinite
      loops!
      <br />
    </div>
  );
};
