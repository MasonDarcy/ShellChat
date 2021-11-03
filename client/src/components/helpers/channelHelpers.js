import ReconnectingEventSource from "reconnecting-eventsource";

export const setSource = (channelID) => {
  return new ReconnectingEventSource(
    `http://localhost:5000/api/chat/${channelID}`
  );
};

export const setSubscriberCallback = (source, callback) => {
  source.onmessage = callback;
};
