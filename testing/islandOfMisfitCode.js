//const bindChatChannel = getBindChatChannel(chat, getSSEListener);

const bindChatChannel = (req, res) => {
  const pump = () => {
    res.write("\n");
  };

  const hbt = setInterval(pump, 30000);

  /*Main chat listener.*/
  const activeListener = (data) => {
    const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`;
    res.write(sseFormattedResponse);
  };

  /*Channel listener (leaving/joining)*/
  const channelListener = getSSEListener("channelEvent", res);

  chat.on(`channelEvent-${req.params.channel_id}`, channelListener);
  chat.on(`chatEvent-${req.params.channel_id}`, activeListener);

  chat.emit(`channelEvent-${req.params.channel_id}`, [
    req.params.agent_id,
    JOINED_CHANNEL_KEY,
  ]);
  res.on("close", () => {
    console.log("EventSource stream closed.");

    clearInterval(hbt);
    chat.removeListener(`chatEvent-${req.params.channel_id}`, activeListener);
    chat.removeListener(
      `channelEvent-${req.params.channel_id}`,
      channelListener
    );
    chat.emit(`channelEvent-${req.params.channel_id}`, [
      req.params.agent_id,
      LEFT_CHANNEL_KEY,
    ]);
  });
};
