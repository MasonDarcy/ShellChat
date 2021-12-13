export const setSource = (url, paramKeys, EventSourceSpecies) => {
  let path = url;
  paramKeys.forEach((pk) => {
    path += `/${pk}`;
  });

  return new EventSourceSpecies(path, { withCredentials: true });
};

export const setSubscriberCallback = (source, messageCallback, eventTuples) => {
  if (messageCallback) {
    source.onmessage = messageCallback;
  }
  eventTuples.forEach((et) => {
    source.addEventListener(et.eventName, et.callback);
  });
};
