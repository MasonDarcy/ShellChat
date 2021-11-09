import {
  getAllHelp,
  getBasicHelp,
  getSingleCommandHelp,
} from "./helpers/getHelpJsx";
const program = require("commander");

export const getCommandProgram = (store, actions, keys) => {
  let { dispatch, getState } = store;

  //This is a hack. Basically the program is cached by node.js and running
  //this multiple times adds redundant commands every time. It's already a singleton.

  if (program.commands.length < 5) {
    program.version("0.0.1");
    program.isInitialized = true;
    /*Disable default help command.*/
    // program.helpOption(false);

    /*Enables catching of errors instead of exiting process.*/
    program.exitOverride();

    /*On an error, writes it to the output object as a property.*/
    program.configureOutput({
      writeErr: (str) => {
        //perhaps dispatch an error message
        dispatch(actions.errorMessageAction(str, keys.ERROR_EVENT_KEY));
      },
    });

    /*Join another channel. TODO Must unsubscribe from previous channel.*/
    program
      .command("login")
      .argument("agentName", "Name of your account. Required.")
      .argument("agentPassword", "Password to your account. Required.")
      .description("Logs the agent into the system.")
      .action((agentName, agentPassword) => {
        console.log(`${agentName}, ${agentPassword}`);
        dispatch(actions.loginAction(agentName, agentPassword));
      });

    /*Join another channel. TODO Must unsubscribe from previous channel.*/
    program
      .command("join")
      .argument("channelID", "The name of the channel to join. Required.")
      .option("-p, --password <String>", "specify a channel password")
      .description("Join a channel, unsubscribes from previous channel.")
      .action((channelID, options, command) => {
        if (getState().subscribeToChannelReducer.isSubscribed) {
          dispatch(actions.unsubscribeAction());
        }

        if (options.password) {
          dispatch(actions.subscribeAction(channelID, options.password));
        } else {
          dispatch(actions.subscribeAction(channelID));
        }
      });

    /*Leave command, leaves the current channel.*/
    program
      .command("leave")
      .description("Unsubscribes the agent from the current channel.")
      .action(() => {
        dispatch(actions.unsubscribeAction());
      });

    /*Clear command, deletes the agent message log from redux store.*/
    program
      .command("clear")
      .description("Clears the client-side messsage log.")
      .action(() => {
        dispatch(actions.clearMessagesAction());
        console.log(`Program commands: ${program.commands}`);
      });

    /*Set the agent's identifier.
  -Temporary hack before log in is fully implemented
*/
    program
      .command("name")
      .description("Set your agent name.")
      .argument("agentName", "The name you're assigning to yourself.")
      .action((agentName) => {
        dispatch(actions.setAgentNameAction(agentName));
      });

    /*Help command. Displays commands.*/
    program
      .command("help")
      .option("-a, --all", "list all commands.")
      .description("Displays a list of all commands")
      .argument("[commandName]", "The name of the command to query help about.")
      .action((commandName, options) => {
        console.log(`commandName: ${commandName}`);
        console.log(`options.all: ${options.all}`);

        if (!commandName && !options.all) {
          dispatch(
            actions.helpMessageAction(getBasicHelp(), keys.HELP_EVENT_KEY)
          );
        } else if (options.all) {
          dispatch(
            actions.helpMessageAction(
              getAllHelp(program.commands),
              keys.HELP_EVENT_KEY
            )
          );

          //This is kind of strange, but options.all seems to stay true even after the command is executed.
          options.all = false;
        } else if (commandName && !options.all) {
          dispatch(
            actions.helpMessageAction(
              getSingleCommandHelp(
                program.commands.find((command) => {
                  return command._name == commandName;
                })
              ),
              keys.HELP_EVENT_KEY
            )
          );
        }
      });

    return program;
  } else {
    return program;
  }
};
