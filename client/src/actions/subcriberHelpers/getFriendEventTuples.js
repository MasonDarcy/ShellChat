export const getFriendEventTupleArray = (store, actions, keys) => {
  const friendRequest = {
    eventName: "friendRequestEvent",
    callback: (e) => {
      const { dispatch, getState } = store;
      const { friendRequestAction } = actions;
      // console.log(`friendEventTupleArray/parsedData[0]:${parsedData[0]}`);

      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName of the sender
      //parsedData[1] = event type ?? do i need to send this, I don't think so
      dispatch(actions.friendRequestReceivedAction(parsedData[0]));
    },
  };

  return [friendRequest];
};
