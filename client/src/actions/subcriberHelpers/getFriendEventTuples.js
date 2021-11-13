export const getFriendEventTupleArray = (store, actions, keys) => {
  const friendRequest = {
    eventName: "friendRequestEvent",
    callback: (e) => {
      const { dispatch } = store;

      console.log(`getFriendEventTuples/friendRequestEvent: Fired`);
      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName of the sender
      //parsedData[1] = event type ?? do i need to send this, I don't think so
      dispatch(actions.friendRequestReceivedAction(parsedData[0]));
    },
  };

  const friendAcceptedEvent = {
    eventName: "friendAcceptedEvent",
    callback: (e) => {
      const { dispatch } = store;
      let parsedData = JSON.parse(e.data);

      dispatch(
        actions.serverMessageAction(
          `${parsedData[0]} has accepted your friend request.`,
          keys.COMMAND_SUCCESS_EVENT_KEY
        )
      );
    },
  };

  const friendMessageEvent = {
    eventName: "friendMessageEvent",
    callback: (e) => {
      const { dispatch } = store;
      let parsedData = JSON.parse(e.data);

      dispatch(
        actions.serverMessageAction(
          `<${parsedData[0]}>: ${parsedData[1]}`,
          keys.NEW_FRIEND_MESSAGE_EVENT_KEY
        )
      );
    },
  };

  return [friendRequest, friendAcceptedEvent, friendMessageEvent];
};
