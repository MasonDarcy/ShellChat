/*Actions-------- ---------------------------------------------*/
import { subscribeAction } from "../../../actions/subscribeAction";
import { unsubscribeAction } from "../../../actions/unsubscribeAction";

import { clearMessagesAction } from "../../../actions/clearMessagesAction";
import { messageAction } from "../../../actions/messageAction";

/*-------------------------------------------------------------*/
import store from "../../../store/store";
import sendChat from "../sendChat";
const program = require("commander");
program.version("0.0.1");

/*Enables catching of errors instead of exiting process.*/
program.exitOverride();

/*On an error, writes it to the output object as a property.*/
program.configureOutput({
  writeErr: (str) => {
    //perhaps dispatch an error message
    store.dispatch(messageAction(str));
  },
});

/*Join another channel. TODO Must unsubscribe from previous channel.*/
program
  .command("join")
  .argument("channelID")
  .option("-p, --password <String>", "specify a channel password")
  .description("Join a channel, unsubscribes from previous channel.")
  .action((channelID, options, command) => {
    sendChat("User has joined the channel.", channelID);

    if (store.getState().subscribeToChannelReducer.isSubscribed) {
      store.dispatch(unsubscribeAction());
    }

    if (options.password) {
      store.dispatch(subscribeAction(channelID, options.password));
      sendChat(
        "User has left the channel.",
        store.getState().subscribeToChannelReducer.previousChannelID
      );
    } else {
      store.dispatch(subscribeAction(channelID));
      sendChat(
        "User has left the channel.",
        store.getState().subscribeToChannelReducer.previousChannelID
      );
    }
  });

/*Clear command, deletes the agent message log from redux store.*/
program
  .command("clear")
  .description("Clears the client-side messsage log.")
  .action(() => {
    store.dispatch(clearMessagesAction());
  });

/*Main export, utility function that parses and returns a function for the redux dispatch.*/
const dispatchCommand = (agentCommand, cid) => {
  if (agentCommand[0] === "/") {
    const trimmedCommand = agentCommand.slice(1);
    const commandArray = [null, null, ...trimmedCommand.split(" ")];

    /*Have to catch a possible error here.*/
    try {
      program.parse(commandArray);
    } catch (err) {
      console.log(
        "Consumed error in ChatInput/dispatchCommand/program.parse()"
      );
      console.log(`Error: ${err}`);
    }
  } else {
    sendChat(agentCommand, cid);
  }
};

export default dispatchCommand;
