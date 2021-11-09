export const setSource = (channelID, store, EventSourceSpecies) => {
  return new EventSourceSpecies(
    `http://localhost:5000/api/chat/${channelID}/${
      store.getState().agentReducer.agentName
    }`,
    { withCredentials: true }
  );
};

export const setSubscriberCallback = (source, messageCallback, eventTuples) => {
  source.onmessage = messageCallback;
  eventTuples.forEach((et) => {
    source.addEventListener(et.eventName, et.callback);
  });
};
