export const getCommandProgram = (store, actions, keys) => {
  let { dispatch, getState } = store;
  let {
    messageAction,
    subscribeAction,
    unsubscribeAction,
    clearMessagesAction,
    setAgentNameAction,
  } = actions;

  //console.log(messageAction);

  const program = require("commander");
  program.version("0.0.1");

  /*Enables catching of errors instead of exiting process.*/
  program.exitOverride();

  /*On an error, writes it to the output object as a property.*/
  program.configureOutput({
    writeErr: (str) => {
      //perhaps dispatch an error message
      dispatch(
        messageAction(
          str,
          store.getState().agentReducer.agentName,
          keys.ERROR_EVENT_KEY
        )
      );
    },
  });

  /*Join another channel. TODO Must unsubscribe from previous channel.*/
  program
    .command("join")
    .argument("channelID")
    .option("-p, --password <String>", "specify a channel password")
    .description("Join a channel, unsubscribes from previous channel.")
    .action((channelID, options, command) => {
      if (getState().subscribeToChannelReducer.isSubscribed) {
        dispatch(unsubscribeAction());
      }

      if (options.password) {
        dispatch(subscribeAction(channelID, options.password));
      } else {
        dispatch(subscribeAction(channelID));
      }
    });

  /*Leave command, leaves the current channel.*/
  program
    .command("leave")
    .description("Unsubscribes the agent from the current channel.")
    .action(() => {
      dispatch(unsubscribeAction());
    });

  /*Clear command, deletes the agent message log from redux store.*/
  program
    .command("clear")
    .description("Clears the client-side messsage log.")
    .action(() => {
      dispatch(clearMessagesAction());
    });

  /*Set the agent's identifier.
  -Temporary hack before log in is fully implemented
*/
  program
    .command("name")
    .description("Sets the agents name.")
    .argument("agentName")
    .action((agentName) => {
      dispatch(setAgentNameAction(agentName));
    });

  return program;
};
