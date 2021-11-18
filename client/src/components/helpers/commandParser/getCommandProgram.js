import {
  getAllHelp,
  getBasicHelp,
  getSingleCommandHelp,
} from "./helpers/getHelpJsx";
const program = require("commander");

export const getCommandProgram = (store, actions, keys) => {
  let { dispatch, getState } = store;
  let { authorizedAction } = actions;
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

    /*Load a module in a channel.*/
    program
      .command("load")
      .argument("moduleType", "Type of the module to load.")
      .description("Loads a channel module.")
      .action((moduleType) => {
        console.log(`commandProgram/load/arg1: ${moduleType}`);
        let agentID = getState().agentReducer.agentName;
        let channelID = getState().subscribeToChannelReducer.currentChannelID;

        dispatch(
          actions.loadChannelModuleAction(moduleType, channelID, agentID)
        );
      });

    /*Close a module in a channel.*/
    program
      .command("close")
      .description("Publically closes the channel module.")
      .action(() => {
        let agentID = getState().agentReducer.agentName;
        let channelID = getState().subscribeToChannelReducer.currentChannelID;
        dispatch(actions.loadChannelModuleAction(null, channelID, agentID));
      });

    /*Dispatch a friend request to another agent.*/
    program
      .command("add")
      .argument("agentName", "The request target agent.")
      .description("Sends a request to another agent to be friends.")
      .action((agentTarget) => {
        dispatch(actions.friendRequestAction(agentTarget));
      });

    /*Accept a friend request from another agent.*/
    program
      .command("accept")
      .argument("agentName", "Name of the friend requester.")
      .description("Accepts a friend request from an agent.")
      .action((agentName) => {
        dispatch(actions.acceptFriendRequestAction(agentName));
      });

    /*Accept a friend request from another agent.*/
    program
      .command("reject")
      .argument("agentName", "Name of the agent to reject.")
      .description("Rejects a friend request from an agent.")
      .action((agentName) => {
        dispatch(actions.rejectFriendRequestAction(agentName));
      });

    /*Accept a friend request from another agent.*/
    program
      .command("m")
      .argument("agentName", "Name of the friend to message.")
      .argument("<message...>", "The message to send.")
      .description("Direct message a friend.")
      .action((agentName, message) => {
        let agentMessage = "";

        /*Messaged is pieced together here by a variadic argument.*/
        message.forEach((word) => {
          agentMessage += ` ${word}`;
        });
        let yourName = getState().agentReducer.agentName;
        dispatch(
          actions.friendMessageAction(agentName, agentMessage, yourName)
        );
      });

    /*Accept a friend request from another agent.*/
    program
      .command("friends")
      .description("Lists your friends and their status.")
      .action(() => {
        dispatch(actions.getFriendListAction());
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
          dispatch(
            authorizedAction(
              actions.subscribeAction(
                store.getState().agentReducer.agentName,
                channelID,
                options.password
              )
            )
          );
        } else {
          dispatch(authorizedAction(actions.subscribeAction, [channelID]));
        }
      });

    /*Logout command, destroys the user'ss session if it exists.*/
    program
      .command("logout")
      .description("Logout from the service.")
      .action(() => {
        dispatch(actions.logoutAction());
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
