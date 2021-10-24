const formatAndWriteChunk = (data) => {
  const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
  res.write(sseFormattedResponse);
};

const setSSEHeaders = (req, res, next) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive: ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();
  next();
};

// const bindChatChannel = (req, res) => {
//   const chat = res.locals.chat;

//   const oldListener = res.locals.chat.removeListener(
//     `chatEvent-${req.params.channel_id}-${req.params.agentID}`
//   );

//   chat.on(
//     `chatEvent-${req.params.channel_id}-${req.params.agentID}`,
//     formatAndWriteChunk(data)
//   );

//   //investigate this
//   res.on("close", () => {
//     //res.end();
//   });
// };

module.exports = sseUtility = {
  setSSEHeaders,
  formatAndWriteChunk,
};
