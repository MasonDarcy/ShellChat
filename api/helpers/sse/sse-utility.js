const setSSEHeaders = (req, res, next) => {
  console.log("Fired set headers.");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive: ");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.flushHeaders();
  next();
};

const getSSEListener = (eventName, res) => {
  return (data) => {
    const sseFormattedResponse = `event: ${eventName}\ndata: ${JSON.stringify(
      data
    )}\n\n`;
    res.write(sseFormattedResponse);
  };
};

module.exports = sseUtility = {
  setSSEHeaders,
  getSSEListener,
};
