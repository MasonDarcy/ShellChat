const setSSEHeaders = (req, res, next) => {
  console.log("Fired set headers.");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive: ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();
  next();
};

module.exports = sseUtility = {
  setSSEHeaders,
};
