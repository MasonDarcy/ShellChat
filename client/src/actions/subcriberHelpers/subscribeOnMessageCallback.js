export const getMessageCallback = (store, keys) => {
  return (e) => {
    let parsedData = JSON.parse(e.data);
    store.dispatch({
      type: keys.newMessage,
      payload: {
        message: parsedData[0],
        agent: parsedData[1],
        eventName: keys.CHAT_EVENT_KEY,
        channelID: store.getState().subscribeToChannelReducer.currentChannelID,
      },
    });
  };
};
