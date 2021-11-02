const setSource = (channelID) => {
  return new EventSource(`http://localhost:5000/api/chat/${channelID}`);
};

const setSubscriberCallback = (source, callback) => {
  source.onmessage = callback;
};

module.exports = {
  setSource,
  setSubscriberCallback,
};
