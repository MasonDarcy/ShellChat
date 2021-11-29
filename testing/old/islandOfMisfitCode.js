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

/*Styling for split pane?--------------------------------------------------------------------

.Resizer {
  background: rgb(212, 208, 208);
  opacity: 0.2;
  z-index: 1;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
}


.Resizer.horizontal {
  height: 11px;
  margin: -5px 0;
  border-top: 5px solid rgba(255, 255, 255, 0);
  border-bottom: 5px solid rgba(255, 255, 255, 0);
  cursor: row-resize;
  width: 100%;
}

.Resizer:hover {
  -webkit-transition: all 2s ease;
  transition: all 2s ease;
}


.Resizer.horizontal:hover {
  border-top: 5px solid rgba(0, 0, 0, 0.5);
  border-bottom: 5px solid rgba(0, 0, 0, 0.5);
}

.Resizer.vertical {
  width: 5px;
  margin: 0 -5px;
  border-left: 5px solid #188dfa;
  border-right: 5px solid #188dfa;
  cursor: col-resize;
}

.Resizer.disabled {
  cursor: not-allowed;
}
.Resizer.disabled:hover {
  border-color: transparent;
}

.resize {
  border: 1px solid black;
  overflow: auto;
}
.resize.horizontal {
  resize: horizontal;
}
.resize.vertical {
  resize: vertical;
}
.resize.both {
  resize: both;
}

*/
