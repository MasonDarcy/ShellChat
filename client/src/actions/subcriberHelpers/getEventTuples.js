export const getEventTupleArray = (store, actions, keys) => {
  const channelEntrancesAndExits = {
    eventName: "channelEvent",
    callback: (e) => {
      const { dispatch, getState } = store;
      const { channelMessageAction } = actions;

      let parsedData = JSON.parse(e.data);
      //parsedData[0] = agentName
      //parsedData[1] = event type

      if (parsedData[0] !== getState().agentReducer.agentName) {
        switch (parsedData[1]) {
          case keys.LEFT_CHANNEL_KEY:
            dispatch(channelMessageAction(parsedData[0], parsedData[1]));
            break;
          case keys.JOINED_CHANNEL_KEY:
            dispatch(channelMessageAction(parsedData[0], parsedData[1]));
            break;
          default:
            console.log("Error");
        }
      }
    },
  };

  return [channelEntrancesAndExits];
};
