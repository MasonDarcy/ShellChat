import {
  getAllHelp,
  getBasicHelp,
  getQuickStartHelp,
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

    /*Help command. Displays commands.*/
    program
      .command("help")
      .option("-a, --all", "list all commands.")
      .option("-q, --quickstart", "describes basic actions more generally.")
      .description("Displays different help information.")
      .argument("[commandName]", "The name of the command to query help about.")
      .action((commandName, options) => {
        if (!commandName && !options.all && !options.quickstart) {
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
        } else {
          dispatch(
            actions.helpMessageAction(getQuickStartHelp(), keys.HELP_EVENT_KEY)
          );
          options.quickstart = false;
        }
      });

    /*Runs the Shellchat demo.*/
    program
      .command("demo")
      .description("Runs a Shellchat demo.")
      .action(() => {
        let agentName = getState().agentReducer.agentName;
        if (!agentName) {
          dispatch(actions.runDemoAction());
        } else {
          dispatch(
            actions.errorMessageAction(
              "error: demo only available to guests. Please logout.",
              keys.ERROR_EVENT_KEY
            )
          );
        }
      });

    /*Logs the user in.*/
    program
      .command("signup")
      .argument("agentName", "Name of your account. Required.")
      .argument("agentPassword", "Password to your account. Required.")
      .description("Signs the agent up with the system, logs them in.")
      .action((agentName, agentPassword) => {
        if (agentName.length <= 12) {
          dispatch(actions.signupAction(agentName, agentPassword));
        } else {
          dispatch(
            actions.errorMessageAction(
              "error: user name must not exceed 12 characters.",
              keys.ERROR_EVENT_KEY
            )
          );
        }
      });

    /*Logs the user in.*/
    program
      .command("login")
      .argument("agentName", "Name of your account. Required.")
      .argument("agentPassword", "Password to your account. Required.")
      .description("Logs the agent into the system.")
      .action((agentName, agentPassword) => {
        dispatch(actions.loginAction(agentName, agentPassword));
      });

    /*Logout command, destroys the user's session if it exists.*/
    program
      .command("logout")
      .description("Logout from the service.")
      .action(() => {
        let agentID = getState().agentReducer.agentName;

        dispatch(actions.logoutAction(agentID));
      });

    /*Join another channel. TODO Must unsubscribe from previous channel.*/
    program
      .command("join")
      .argument("channelID", "The name of the channel to join. Required.")
      .option("-p, --password <String>", "specify a channel password")
      .description("Join a channel, unsubscribes from previous channel.")
      .action((channelID, options, command) => {
        if (channelID.length < 13) {
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
        } else {
          dispatch(
            actions.errorMessageAction(
              "error: channel names must be 12 characters or less.",
              keys.ERROR_EVENT_KEY
            )
          );
        }
      });

    /*Load a module in a channel.*/
    program
      .command("load")
      .argument("moduleType", "Type of the module to load.")
      .description(
        "Loads a channel module. Must be inside a channel to use. Current moduleTypes that can be loaded are: CODE (case sensitive)."
      )
      .action((moduleType) => {
        let agentID = getState().agentReducer.agentName;
        let channelID = getState().subscribeToChannelReducer.currentChannelID;
        let isSubscribed = getState().subscribeToChannelReducer.isSubscribed;
        if (moduleType == "CODE") {
          dispatch(
            actions.loadChannelModuleAction(
              moduleType,
              channelID,
              agentID,
              isSubscribed
            )
          );
        } else {
          dispatch(
            actions.errorMessageAction(
              "error: invalid module type.",
              keys.ERROR_EVENT_KEY
            )
          );
        }
      });

    /*Run code in the code module.*/
    program
      .command("run")
      .description("Runs the code in the code editor.")
      .action(() => {
        let agentID = getState().agentReducer.agentName;
        let channelID = getState().subscribeToChannelReducer.currentChannelID;

        let module = getState().codeModuleReducer.codeEditorRef;
        let code = module?.getValue();

        dispatch(actions.runCodeAction(code, agentID, channelID, module));
      });

    /*Close a module in a channel.*/
    program
      .command("close")
      .description("Publically closes the channel module.")
      .action(() => {
        let agentID = getState().agentReducer.agentName;
        let channelID = getState().subscribeToChannelReducer.currentChannelID;
        // dispatch(actions.closeChannelModuleAction(null, channelID, agentID));

        let isSubscribed = getState().subscribeToChannelReducer.isSubscribed;

        dispatch(
          actions.loadChannelModuleAction(
            null,
            channelID,
            agentID,
            isSubscribed
          )
        );
      });

    /*Leave command, leaves the current channel.*/
    program
      .command("leave")
      .description("Unsubscribes the agent from the current channel.")
      .action(() => {
        dispatch(actions.unsubscribeAction());
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

    /*reject a friend request from another agent.*/
    program
      .command("reject")
      .argument("agentName", "Name of the agent to reject.")
      .description("Rejects a friend request from an agent.")
      .action((agentName) => {
        dispatch(actions.rejectFriendRequestAction(agentName));
      });

    /*reject a friend request from another agent.*/
    program
      .command("requests")
      .description("Lists your pending friend requests.")
      .action(() => {
        dispatch(actions.getRequestsAction());
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

    /*Clear command, deletes the agent message log from redux store.*/
    program
      .command("clear")
      .description("Clears the client-side messsage log.")
      .action(() => {
        dispatch(actions.clearMessagesAction());
      });

    return program;
  } else {
    return program;
  }
};
