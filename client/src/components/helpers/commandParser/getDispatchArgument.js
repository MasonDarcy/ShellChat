/*Actions-------- ---------------------------------------------*/
import { subscribeAction } from "../../../actions/subscribeAction";
import { clearMessagesAction } from "../../../actions/clearMessagesAction";

/*-------------------------------------------------------------*/
const program = require("commander");
program.version("0.0.1");

/*
Output is a hack for now to use commander, haven't figured out how to 
return a value from the action handlers.
*/
let output = {};

/*Enables catching of errors instead of exiting process.*/
program.exitOverride();

/*On an error, writes it to the output object as a property.*/
program.configureOutput({
  writeErr: (str) => {
    output.status = "error";
    output.errMessage = str;
  },
});

/*Join command to listening to other channels, optional password flag.*/
program
  .command("join")
  .argument("channelID")
  .option("-p, --password <String>", "channel password")
  .description("Join a channel, unsubscribes from previous channel.")
  .action((channelID, options, command) => {
    output = {};
    output.status = "success";
    output.cb = subscribeAction;
    if (options.password) {
      output.args = [channelID, options.password];
    } else {
      output.args = [channelID];
    }
  });

/*Clear command to clear the agent log.*/
program
  .command("clear")
  .description("Clears the client-side messsage log.")
  .action(() => {
    output.status = "success";
    output.cb = clearMessagesAction;
    output.args = [];
  });

/*Main export, utility function that parses and returns a function for the redux dispatch.*/
const getDispatchArgument = (agentCommand) => {
  if (agentCommand[0] === "/") {
    const trimmedCommand = agentCommand.slice(1);
    const commandArray = [null, null, ...trimmedCommand.split(" ")];

    try {
      program.parse(commandArray);
      return output;
    } catch (err) {
      return output;
    }
  } else {
    return null;
  }
};

export default getDispatchArgument;
