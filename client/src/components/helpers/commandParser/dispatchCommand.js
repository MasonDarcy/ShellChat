import { getCommandProgram } from "./getCommandProgram";

const dispatchCommand = (
  agentCommand,
  cid,
  store,
  actions,
  sendChat,
  keys,
  commandState
) => {
  let program = getCommandProgram(store, actions, keys);
  let { messageAction } = actions;

  if (commandState) {
    // const trimmedCommand = agentCommand.slice(1);
    const commandArray = [null, null, ...agentCommand.split(" ")];

    /*Have to catch a possible error here.*/
    try {
      program.parse(commandArray);
      //add command to the command list if there's no error
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  } else {
    store.getState().subscribeToChannelReducer.isSubscribed
      ? //Name vs id vs alias ?
        sendChat(agentCommand, cid, store.getState().agentReducer.agentName)
      : store.dispatch(
          messageAction(
            agentCommand,
            store.getState().agentReducer.agentName,
            keys.CHAT_EVENT_KEY,
            cid
          )
        );
  }
};

export default dispatchCommand;
