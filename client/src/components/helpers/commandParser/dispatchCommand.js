import { getCommandProgram } from "./getCommandProgram";

const dispatchCommand = (agentCommand, cid, store, actions, sendChat, keys) => {
  let program = getCommandProgram(store, actions, keys);
  let { messageAction } = actions;
  if (agentCommand[0] === "/") {
    const trimmedCommand = agentCommand.slice(1);
    const commandArray = [null, null, ...trimmedCommand.split(" ")];
    /*Have to catch a possible error here.*/
    try {
      program.parse(commandArray);
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
