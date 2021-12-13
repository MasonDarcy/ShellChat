const setSSEHeaders = (req, res, next) => {
  console.log("Fired set headers.");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive: ");
  res.flushHeaders();
  next();
};

const setSSEHeaders2 = (req, res, next) => {
  console.log("Fired set headers.");
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
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
  setSSEHeaders2,
  getSSEListener,
};
